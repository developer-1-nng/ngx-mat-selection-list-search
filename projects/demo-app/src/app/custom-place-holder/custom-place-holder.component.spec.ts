import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlaceHolderComponent } from './custom-place-holder.component';

describe('CustomPlaceHolderComponent', () => {
  let component: CustomPlaceHolderComponent;
  let fixture: ComponentFixture<CustomPlaceHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPlaceHolderComponent]
    });
    fixture = TestBed.createComponent(CustomPlaceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
