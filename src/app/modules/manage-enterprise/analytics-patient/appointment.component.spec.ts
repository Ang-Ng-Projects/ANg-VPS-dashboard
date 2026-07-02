import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPatientComponent } from './analytics-patient.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsPatientComponent;
  let fixture: ComponentFixture<AnalyticsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
