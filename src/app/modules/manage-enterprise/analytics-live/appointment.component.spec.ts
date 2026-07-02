import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsLiveComponent } from './analytics-live.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsLiveComponent;
  let fixture: ComponentFixture<AnalyticsLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
