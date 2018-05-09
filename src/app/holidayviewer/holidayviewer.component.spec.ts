import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayviewerComponent } from './holidayviewer.component';

describe('HolidayviewerComponent', () => {
  let component: HolidayviewerComponent;
  let fixture: ComponentFixture<HolidayviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
