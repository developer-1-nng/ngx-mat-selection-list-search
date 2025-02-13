import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMatFormFieldAppearanceComponent } from './dynamic-mat-form-field-appearance.component';

describe('DynamicMatFormFieldAppearanceComponent', () => {
  let component: DynamicMatFormFieldAppearanceComponent;
  let fixture: ComponentFixture<DynamicMatFormFieldAppearanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicMatFormFieldAppearanceComponent]
    });
    fixture = TestBed.createComponent(DynamicMatFormFieldAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
