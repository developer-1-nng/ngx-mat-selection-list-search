import { NgModule } from '@angular/core';
import { NgxMatSelectionListSearchComponent } from './ngx-mat-selection-list-search.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectionListNoRecordsFoundDirective } from './ngx-mat-selection-list-no-records-found.directive';
export { NgxMatSelectionListNoRecordsFoundDirective };

@NgModule({
  declarations: [NgxMatSelectionListSearchComponent, NgxMatSelectionListNoRecordsFoundDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [NgxMatSelectionListSearchComponent,NgxMatSelectionListNoRecordsFoundDirective],
})
export class NgxMatSelectionListSearchModule {}
