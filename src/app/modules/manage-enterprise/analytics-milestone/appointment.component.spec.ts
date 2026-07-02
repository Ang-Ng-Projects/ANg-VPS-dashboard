import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsMileComponent } from './analytics-mile.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsMileComponent;
  let fixture: ComponentFixture<AnalyticsMileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsMileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsMileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
