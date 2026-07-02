import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsLanguageComponent } from './analytics-language.component';

describe('AppointmentComponent', () => {
  let component: AnalyticsLanguageComponent;
  let fixture: ComponentFixture<AnalyticsLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
