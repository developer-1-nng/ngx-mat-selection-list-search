import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInOneComponent } from './all-in-one.component';

describe('AllInOneComponent', () => {
  let component: AllInOneComponent;
  let fixture: ComponentFixture<AllInOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInOneComponent]
    });
    fixture = TestBed.createComponent(AllInOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
