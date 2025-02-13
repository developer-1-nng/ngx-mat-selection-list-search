import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnEnterComponent } from './search-on-enter.component';

describe('SearchOnEnterComponent', () => {
  let component: SearchOnEnterComponent;
  let fixture: ComponentFixture<SearchOnEnterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchOnEnterComponent]
    });
    fixture = TestBed.createComponent(SearchOnEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
