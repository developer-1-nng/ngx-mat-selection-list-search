import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOnSearchComponent } from './loader-on-search.component';

describe('LoaderOnSearchComponent', () => {
  let component: LoaderOnSearchComponent;
  let fixture: ComponentFixture<LoaderOnSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderOnSearchComponent]
    });
    fixture = TestBed.createComponent(LoaderOnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
