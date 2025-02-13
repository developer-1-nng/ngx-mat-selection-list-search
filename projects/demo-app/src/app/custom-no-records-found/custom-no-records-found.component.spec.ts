import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNoRecordsFoundComponent } from './custom-no-records-found.component';

describe('CustomNoRecordsFoundComponent', () => {
  let component: CustomNoRecordsFoundComponent;
  let fixture: ComponentFixture<CustomNoRecordsFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomNoRecordsFoundComponent]
    });
    fixture = TestBed.createComponent(CustomNoRecordsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
