import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClearAllOptionComponent } from './select-clear-all-option.component';

describe('SelectClearAllOptionComponent', () => {
  let component: SelectClearAllOptionComponent;
  let fixture: ComponentFixture<SelectClearAllOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectClearAllOptionComponent]
    });
    fixture = TestBed.createComponent(SelectClearAllOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
