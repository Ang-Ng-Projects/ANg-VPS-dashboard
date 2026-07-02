import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAppointmentComponent } from './analytics-appointment.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsAppointmentComponent;
  let fixture: ComponentFixture<AnalyticsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
