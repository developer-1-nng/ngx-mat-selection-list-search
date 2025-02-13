import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatSelectionListSearchComponent } from './ngx-mat-selection-list-search.component';
import { Component, ViewChild } from '@angular/core';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { NgxMatSelectionListSearchModule } from './ngx-mat-selection-list-search.module';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mat-selection-list-search-test',
  template: `
    <ng-container [ngSwitch]="testCase">
    <mat-selection-list #selectionList  *ngSwitchDefault>
      <ngx-mat-selection-list-search
        #matSectionListSearch
      ></ngx-mat-selection-list-search>
      <mat-list-option
        *ngFor="let shoe of listOptions"
        [value]="shoe"
      >
        {{ shoe }}
      </mat-list-option>
    </mat-selection-list>

    <mat-selection-list #selectionList *ngSwitchCase="'customNoRecordsFound'">
      <ngx-mat-selection-list-search #matSectionListSearch>
        <span ngxMatSelectionListNoRecordsFound>
          <div class="custom-no-records-found"></div>
        </span>
      </ngx-mat-selection-list-search>
      <mat-list-option *ngFor="let shoe of listOptions" [value]="shoe">
        {{ shoe }}
      </mat-list-option>
    </mat-selection-list>

    <mat-selection-list #selectionList *ngSwitchCase="'searchOnEnter'">
      <ngx-mat-selection-list-search #matSectionListSearch [searchOnEnter]="true">
        <span ngxMatSelectionListNoRecordsFound>
          <div class="custom-no-records-found"></div>
        </span>
      </ngx-mat-selection-list-search>
      <mat-list-option *ngFor="let shoe of listOptions" [value]="shoe">
        {{ shoe }}
      </mat-list-option>
    </mat-selection-list>
    </ng-container>
    
  `,
})
export class NgxMatSelectionListSearchTestComponent {
  listOptions: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  @ViewChild('selectionList') matSelectionList!: MatSelectionList;
  @ViewChild('matSectionListSearch')
  matSelectionListSearch!: NgxMatSelectionListSearchComponent;

testCase !: "customNoRecordsFound"|"searchOnEnter";
}


describe('NgxMatSelectionListSearchComponent', () => {
  let component: NgxMatSelectionListSearchTestComponent;
  let fixture: ComponentFixture<NgxMatSelectionListSearchTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMatSelectionListSearchTestComponent],
      imports: [
        CommonModule,
        MatListModule,
        NgxMatSelectionListSearchModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxMatSelectionListSearchTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input and list options correctly', () => {
    const compiled = fixture.nativeElement;
    const searchField = compiled.querySelector('.nng-search-field-container');
    const inputElement = compiled.querySelector(
      'input[aria-label="ngx-mat-selection-list-search-field"]'
    );
    const options = compiled.querySelectorAll('mat-list-option');
    expect(searchField).toBeTruthy();
    expect(inputElement).toBeTruthy();
    expect(options.length).toBe(component.listOptions.length);
  });

  it('should filter list options correctly, searching with "a" and clearing a search', async () => {
    const compiled = fixture.nativeElement;
    const searchInputElement = compiled.querySelector(
      'input[aria-label="ngx-mat-selection-list-search-field"]'
    );
    const searchKey = 'a';

    searchInputElement.value = searchKey;
    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.matSelectionListSearch.searchControl.value).toBe(
      searchKey
    );

    await fixture.whenStable();
      const manualFilterOptions = component.listOptions.filter((option) =>
        option.toLowerCase().includes(searchKey.toLocaleLowerCase())
      );
      expect(component.matSelectionListSearch.filteredOptionsLength).toBe(
        manualFilterOptions.length
      );
      const listOptions = compiled.querySelectorAll(
        'mat-list-option'
      );

      const renderedOptions = Array.from(listOptions).filter((el) => {
        const style = window.getComputedStyle(el as HTMLElement);
        return style.display != 'none';
      });

      expect(renderedOptions?.length).toBe(manualFilterOptions.length);

    //clearing searched value
    const clearSearchButton = compiled.querySelector(
      '#nng-clear-search-button'
    );
    clearSearchButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(searchInputElement.value).toBeFalsy();
    expect(component.matSelectionListSearch.searchControl.value).toBeFalsy();
    expect(component.matSelectionListSearch.filteredOptionsLength).toBe(
      component.listOptions.length
    );
  });

  it('should render dynamic placehorder for search field, setting placehoder as "New search placeholder"', () => {
    const compiled = fixture.nativeElement;
    const searchInputElement = compiled.querySelector(
      'input[aria-label="ngx-mat-selection-list-search-field"]'
    );
    const newPlaceholder = 'New search placeholder';
    //checking default placeholder
    expect(component.matSelectionListSearch.placeholder).toBe('Search');
    expect(searchInputElement.placeholder).toBe('Search');

    component.matSelectionListSearch.placeholder = newPlaceholder;
    fixture.detectChanges();
    expect(searchInputElement.placeholder).toBe(newPlaceholder);
  });

  it('should render dynamic appearance for search field, setting appearance as "fill"', () => {
    const compiled = fixture.nativeElement;
    const searchMatFormField = compiled.querySelector('.nng-search-field');
    expect(searchMatFormField.classList).toContain(
      'mat-form-field-appearance-outline'
    );

    component.matSelectionListSearch.fieldAppearance = 'fill';
    fixture.detectChanges();
    expect(searchMatFormField.classList).toContain(
      'mat-form-field-appearance-fill'
    );
  });

  it('should render loader correctly,', async () => {
    const compiled = fixture.nativeElement;
    component.matSelectionListSearch.showLoader = true;
    component.matSelectionListSearch.searchControl.setValue('a');
    fixture.detectChanges();
    const progressSpinner = compiled.querySelector(
      'mat-progress-bar.nng-search-loader'
    );
    expect(progressSpinner).toBeTruthy();

    await fixture.whenStable();

    fixture.detectChanges();
    const progressSpinnerAfterTick = compiled.querySelector(
      'mat-progress-bar.nng-search-loader'
    );
    expect(progressSpinnerAfterTick).toBeFalsy();

    component.matSelectionListSearch.showLoader = false;
    component.matSelectionListSearch.searchControl.setValue('b');
    fixture.detectChanges();
    const spinner = compiled.querySelector(
      'mat-progress-bar.nng-search-loader'
    );
    expect(spinner).toBeFalsy();
  });

  it('should display no records message if no filtered records are there,', async () => {
    const compiled = fixture.nativeElement;
    component.matSelectionListSearch.searchControl.setValue('zzzz');

    await fixture.whenStable();
    expect(component.matSelectionListSearch.noFilteredRecords).toBeTrue();
    fixture.detectChanges();
    const noRecordsMsg: HTMLElement = compiled.querySelector(
      '.nng-default-no-records-found'
    );
    expect(noRecordsMsg).toBeTruthy();
    expect(noRecordsMsg.textContent?.trim()).toBe(
      'No results found for the searched text!'
    );

    // component.matSelectionListSearch.clearSearch();
    // await fixture.whenStable();
    //   fixture.detectChanges();
    //   expect(component.matSelectionListSearch.noFilteredRecords).toBeFalse();
    //   const noRecordsMsgAfterClearSearch: HTMLElement = compiled.querySelector(
    //     '.nng-default-no-records-found'
    //   );
    //   expect(noRecordsMsgAfterClearSearch).toBeFalsy();
  });

  it('should display no records message if no filtered records are there (custom no records template),', async () => {
    const compiled = fixture.nativeElement;
    component.testCase = "customNoRecordsFound";
    fixture.detectChanges();
    component.matSelectionListSearch.searchControl.setValue(
      'zzzz'
    );

    await fixture.whenStable();
    expect(
      component.matSelectionListSearch.noFilteredRecords
    ).toBeTrue();
    fixture.detectChanges();
    const defaultNoRecordsMsg: HTMLElement = compiled.querySelector(
      '.nng-default-no-records-found'
    );

    const customNoRecordsMsg: HTMLElement = compiled.querySelector(
      '[ngxMatSelectionListNoRecordsFound]'
    );
    expect(defaultNoRecordsMsg).toBeFalsy();
    expect(customNoRecordsMsg).toBeTruthy();

    // component.matSelectionListSearch.clearSearch();
    // await fixture.whenStable();
    //   fixture.detectChanges();
    //   expect(component.matSelectionListSearch.noFilteredRecords).toBeFalse();
    //   const noRecordsMsgAfterClearSearch: HTMLElement = compiled.querySelector(
    //     '.nng-default-no-records-found'
    //   );
    //   expect(noRecordsMsgAfterClearSearch).toBeFalsy();
  });

  it('should render select all and clear actions correctly, selecting all options and clearing selected options  ', async () => {
    const compiled = fixture.nativeElement;
    let selectAllAction: HTMLElement = compiled.querySelector(
      '.nng-search-select-all-action'
    );
    let clearAllAction: HTMLElement = compiled.querySelector(
      '.nng-search-clear-all-action'
    );

    expect(selectAllAction).toBeFalsy();
    expect(clearAllAction).toBeFalsy();

    component.matSelectionListSearch.selectAllAction = true;
    component.matSelectionListSearch.clearAllAction = true;
    fixture.detectChanges();

    selectAllAction = compiled.querySelector('.nng-search-select-all-action');
    clearAllAction = compiled.querySelector('.nng-search-clear-all-action');

    expect(selectAllAction).toBeTruthy();
    expect(clearAllAction).toBeTruthy();

    selectAllAction.click();
    fixture.detectChanges();
    component.matSelectionList.options.forEach((option) => {
      expect(option.selected).toBeTrue();
    });
    clearAllAction.click();
    fixture.detectChanges();
    component.matSelectionList.options.forEach((option) => {
      expect(option.selected).toBeFalse();
    });
  });

  it('should search on enter when searchOnEnter is enabled', async () => {
    const compiled = fixture.nativeElement;
    component.testCase = "searchOnEnter";
    fixture.detectChanges();
    let inputElement = compiled.querySelector(
      'input[aria-label="ngx-mat-selection-list-search-field"]'
    );

    const searchKey = 'a';
    inputElement.value = searchKey;
    // inputElement.dispatchEvent(new Event('input',{bubbles:false}));
    fixture.detectChanges();
    
    await fixture.whenStable();
    fixture.detectChanges();
    let listOptions = compiled.querySelectorAll(
      'mat-list-option'
    );

    let renderedOptions = Array.from(listOptions).filter((el) => {
      const style = window.getComputedStyle(el as HTMLElement);
      return style.display != 'none';
    }); 

    expect(renderedOptions?.length).toBe(component.listOptions.length);


    
    expect(inputElement).toBeTruthy();
    inputElement.focus();
    component.matSelectionListSearch.searchControl.setValue(searchKey);
    const enterKeyDownEvent = new KeyboardEvent('keydown', { key: 'enter' });
    inputElement.dispatchEvent(enterKeyDownEvent);
    fixture.detectChanges();
    
    await fixture.whenStable();
    fixture.detectChanges();
     listOptions = compiled.querySelectorAll(
      'mat-list-option'
    );
     renderedOptions = Array.from(listOptions).filter((el) => {
      const style = window.getComputedStyle(el as HTMLElement);
      return style.display != 'none';
    }); 

    const manualFilterOptions = component.listOptions.filter((option) =>
      option.toLowerCase().includes(searchKey.toLocaleLowerCase())
    );

    expect(renderedOptions?.length).toBe(manualFilterOptions.length);
    expect(component.matSelectionListSearch.filteredOptionsLength).toBe(manualFilterOptions.length);
     
  });
});
