import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEnterpriseRoutingModule } from './manage-enterprise-routing.module';

import { MilestoneComponent } from './milestone/milestone.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageEnterpriseComponent } from './manage-enterprise.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '@shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Daterangepicker } from 'ng2-daterangepicker';
import { ActivityComponent } from './activity/activity.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegionComponent } from 'src/app/matrix/region/region.component';
import { MatTableModule } from '@angular/material/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AnalyticsMileComponent } from './analytics-milestone/analytics-mile.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LabComponent } from './lab/lab.component';
import { AnalyticsVisitorComponent } from './analytics-visitor/analytics-visitor.component';
import { AnalyticsLiveComponent } from './analytics-live/analytics-live.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NgxMonthPickerModule } from 'ngx-month-picker-range';
import { CalendarModule } from 'primeng/calendar';
import { PatientComponent } from './patient/patient.component';
import { RemainderComponent } from './remainder/remainder.component';


@NgModule({
  declarations: [
    // AnalyticsPatientComponent,
    PatientComponent,
    MilestoneComponent,
    AnalyticsLiveComponent,
    // AnalyticsLanguageComponent,
    AnalyticsMileComponent,
    AnalyticsVisitorComponent,
    RegionComponent,
    AllTicketsComponent,
    HospitalComponent,
    VisitorsComponent,
    FeedbackComponent,
    LabComponent,
    ManageEnterpriseComponent, ActivityComponent, AppointmentComponent,
    PharmacyComponent,
    RemainderComponent
  ],
  imports: [
    CalendarModule,
    MatButtonModule,
    NgxMonthPickerModule,
    NgSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageEnterpriseRoutingModule,
    NgxPaginationModule,
    SharedModule,
    Daterangepicker,
    SharedModule,
    MatTableModule,

  ]
})
export class ManageEnterpriseModule { }
