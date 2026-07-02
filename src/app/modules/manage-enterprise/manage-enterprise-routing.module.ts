import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MilestoneComponent } from './milestone/milestone.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageEnterpriseComponent } from './manage-enterprise.component';
import { ActivityComponent } from './activity/activity.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegionComponent } from 'src/app/matrix/region/region.component';
import { AnalyticsMileComponent } from './analytics-milestone/analytics-mile.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LabComponent } from './lab/lab.component';
import { AnalyticsLanguageComponent } from './analytics-language/analytics-language.component';
import { AnalyticsAppointmentComponent } from './analytics-appointment/analytics-appointment.component';
import { AnalyticsVisitorComponent } from './analytics-visitor/analytics-visitor.component';
import { AnalyticsLiveComponent } from './analytics-live/analytics-live.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PatientComponent } from './patient/patient.component';
import { AnalyticsPatientComponent } from './analytics-patient/analytics-patient.component';
import { RemainderComponent } from './remainder/remainder.component';


const routes: Routes = [

  {
    path: '',
    component: ManageEnterpriseComponent,
    children: [
      {
        path: 'analytics-mile',
        component: AnalyticsMileComponent
      },
      {
        path: 'analytics-patient',
        component: AnalyticsPatientComponent
      },
      {
        path: 'analytics-live',
        component: AnalyticsLiveComponent
      },
      {
        path: 'analytics-language',
        component: AnalyticsLanguageComponent
      },
      {
        path: 'analytics-appointment',
        component: AnalyticsAppointmentComponent
      },
      {
        path: 'analytics-visitors',
        component: AnalyticsVisitorComponent
      },
      {
        path: 'visitors',
        component: VisitorsComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
      {
        path: 'tickets',
        component: AllTicketsComponent
      },
      {
        path: 'lab',
        component: LabComponent
      },
      {
        path: 'milestone',
        component: MilestoneComponent
      },
      {
        path: 'hospital',
        component: HospitalComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
        path: 'appointment',
        component: AppointmentComponent
      },
      {
        path: 'metrix/region',
        component: RegionComponent
      },
      {
        path: 'pharmacy',
        component: PharmacyComponent
      },
      {
        path: 'patientReg',
        component: PatientComponent
      },
      {
        path: 'Reminder',
        component: RemainderComponent
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEnterpriseRoutingModule { }
