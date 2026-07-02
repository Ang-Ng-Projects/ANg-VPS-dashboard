import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsVisitorComponent } from './analytics-visitor.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsVisitorComponent;
  let fixture: ComponentFixture<AnalyticsVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
