import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {
  startWith,
  tap,
  distinctUntilChanged,
  debounceTime,
  Subject,
} from 'rxjs';
import { NgxMatSelectionListNoRecordsFoundDirective } from './ngx-mat-selection-list-no-records-found.directive';

@Component({
  selector: 'ngx-mat-selection-list-search',
  template: `
    <div class="nng-search-field-container">
      <div>
        <mat-form-field
          class="nng-search-field"
          [appearance]="fieldAppearance"
          subscriptSizing="dynamic"
        >
          <mat-icon matIconPrefix>search</mat-icon>
          <input
            searchInput
            matInput
            aria-label="ngx-mat-selection-list-search-field"
            [placeholder]="placeholder"
            [formControl]="searchControl"
            (keydown)="$event.stopPropagation()"
            (keydown.enter)="
              searchOnEnter && $enterKeyObeservable.next(searchControl.value)
            "
          />
          <div
            *ngIf="
              !searchControl.value &&
              isMultipleSelectionList &&
              !noFilteredRecords
            "
            matSuffix
            class="nng-search-action-buttons"
          >
            <button
              class="nng-search-select-all-action"
              color="primary"
              mat-flat-button
              (click)="selectAllOptions($event)"
              *ngIf="selectAllAction"
            >
              Select All
            </button>
            <button
              *ngIf="clearAllAction"
              class="nng-search-clear-all-action"
              color="primary"
              mat-stroked-button
              (click)="clearAllOptions($event)"
            >
              Clear
            </button>
          </div>

          <div
            *ngIf="
              searchControl.value || (!searchControl.value && noFilteredRecords)
            "
            matSuffix
            class="nng-search-action-buttons"
          >
            <button
              id="nng-clear-search-button"
              mat-icon-button
              (click)="clearSearch()"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </mat-form-field>
        <mat-progress-bar
          class="nng-search-loader"
          [mode]="'indeterminate'"
          *ngIf="loading"
        ></mat-progress-bar>
      </div>
    </div>

    <div *ngIf="noFilteredRecords">
      <ng-content
        *ngIf="customNoRecordsFound; else defualtNoRecordsFound"
        select="[ngxMatSelectionListNoRecordsFound]"
      ></ng-content>
      <ng-template #defualtNoRecordsFound
        ><h3 class="nng-default-no-records-found">
          No results found for the searched text!
        </h3></ng-template
      >
    </div>
  `,
  styleUrls: ['./ngx-mat-selection-list-search.component.css'],
})
export class NgxMatSelectionListSearchComponent implements AfterContentInit {
  /**
   * Placeholder for the search field
   */
  @Input() placeholder: string = 'Search';

  /**
   * Appearance for the search field
   */
  @Input() fieldAppearance: MatFormFieldAppearance = 'outline';

  /**
   * Debounce time in milliseconds
   */
  @Input() debounceTime: number = 300;

  /**
   * Whether to display select all action button
   */
  @Input() selectAllAction: boolean = false;

  /**
   * Whether to display clear action button
   */
  @Input() clearAllAction: boolean = false;

  /**
   * Whether to display loader on search
   */
  @Input() showLoader: boolean = false;

  /**
   * When sets to true search will happned on 'Enter' key press and not while typing the search text
   */
  @Input() searchOnEnter: boolean = false;

  $enterKeyObeservable = new Subject();

  /**
   * Emits search text changes
   */
  @Output() searchChange = new EventEmitter<string>();

  /**
   * Custom no records found template set using ```NgxMatSelectionListNoRecordsFoundDirective```
   */
  @ContentChild(NgxMatSelectionListNoRecordsFoundDirective)
  customNoRecordsFound!: NgxMatSelectionListNoRecordsFoundDirective;

  /**
   * Form control for the search input
   */
  searchControl = new FormControl('');

  /**
   * Filtered options after performing search
   */
  private _filteredOptions: MatListOption[] = [];

  /**
   * loader variable to display loader on search
   */
  private _loader: boolean = false;

  /**
   * Returns true when search is being carried out
   */
  get loading() {
    return this._loader && this.showLoader;
  }
  /**
   * Returns true when no record matches search text, otherwise false
   */
  get noFilteredRecords() {
    return this._filteredOptions.length === 0;
  }

  get filteredOptionsLength() {
    return this._filteredOptions.length;
  }
  /**
   * Whether multiple selection option is enabled in parent ```mat-selection-list```
   */
  get isMultipleSelectionList() {
    return this.matSelectionList.multiple;
  }

  constructor(
    @Inject(MatSelectionList) private matSelectionList: MatSelectionList,
    @Optional()
    @Inject(MatListOption)
    @Optional()
    @Inject(MatFormField)
    public matFormField: MatFormField
  ) {}

  ngAfterContentInit(): void {
    this._filteredOptions = this.matSelectionList.options.toArray();
  }

  ngOnInit(): void {
    if (this.searchOnEnter) {
      this.$enterKeyObeservable
        .pipe(
          startWith(null),
          tap(() => (this._loader = true)),
          debounceTime(this.debounceTime)
        )
        .subscribe(() => {
          this.filterOptions();
        });
    } else {
      this.searchControl.valueChanges
        .pipe(
          startWith(null),
          tap(() => (this._loader = true)),
          distinctUntilChanged(),
          debounceTime(this.debounceTime)
        )
        .subscribe(() => {
          this.filterOptions();
        });
    }
  }

  /**
   * Filtering logic to filter mat-list-options based on search text
   */
  private filterOptions(): void {
    this._filteredOptions = [];

    this.matSelectionList.options.forEach((option) => {
      const label = option.getLabel();
      const search_key = this.searchControl.value
        ? this.searchControl.value
        : '';
      const display = label.toLowerCase().includes(search_key.toLowerCase());
      option._hostElement.style.display = display ? '' : 'none';

      if (display) {
        this._filteredOptions.push(option);
      }
    });
    this._loader = false;
  }

  /**
   * Clears search filter and displays all mat-list-options
   */
  clearSearch() {
    this.searchControl.reset();
    this.searchOnEnter &&
      this.$enterKeyObeservable.next(this.searchControl.value);
  }

  /**
   * Selects all mat-list-options
   * @param event Mouse click event
   */
  selectAllOptions(event: MouseEvent) {
    event.stopPropagation();
    this.matSelectionList.selectAll();
  }

  /**
   * Clears all mat-list-option selections
   * @param event Mouse click event
   */
  clearAllOptions(event: MouseEvent) {
    event.stopPropagation();
    this.matSelectionList.deselectAll();
  }
}
