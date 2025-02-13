import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMatSelectionListSearchModule } from '../../../ngx-mat-selection-list-search/src/lib/ngx-mat-selection-list-search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomPlaceHolderComponent } from './custom-place-holder/custom-place-holder.component';
import { DynamicMatFormFieldAppearanceComponent } from './dynamic-mat-form-field-appearance/dynamic-mat-form-field-appearance.component';
import { SelectClearAllOptionComponent } from './select-clear-all-option/select-clear-all-option.component';
import { LoaderOnSearchComponent } from './loader-on-search/loader-on-search.component';
import { SearchOnEnterComponent } from './search-on-enter/search-on-enter.component';
import { CustomNoRecordsFoundComponent } from './custom-no-records-found/custom-no-records-found.component';
import { AllInOneComponent } from './all-in-one/all-in-one.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_CARD_CONFIG, MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, CustomPlaceHolderComponent, DynamicMatFormFieldAppearanceComponent, SelectClearAllOptionComponent, LoaderOnSearchComponent, SearchOnEnterComponent, CustomNoRecordsFoundComponent, AllInOneComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMatSelectionListSearchModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [{provide:MAT_CARD_CONFIG,useValue:{appearance:"outlined"}}],
  bootstrap: [AppComponent],
})
export class AppModule {}
