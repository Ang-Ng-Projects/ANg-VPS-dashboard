import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ChartDashboardComponent } from './charts/chart-dashboard/chart-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomListComponent } from './custom-list/custom-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AnimatedDigitComponent } from './animated-digit/animated-digit.component';
import { RadialChartComponent } from './radial-chart/radial-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { StackedChartComponent } from './stacked-chart/stacked-chart.component';
import { AnalyticsLanguageComponent } from '../manage-enterprise/analytics-language/analytics-language.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AnalyticsAppointmentComponent } from '../manage-enterprise/analytics-appointment/analytics-appointment.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CalendarModule } from 'primeng/calendar';
import { AnalyticsPatientComponent } from '../manage-enterprise/analytics-patient/analytics-patient.component';

@NgModule({
  declarations: [
    AnalyticsPatientComponent,
    MenuBarComponent,
    AnalyticsAppointmentComponent,
    AnalyticsLanguageComponent,
    AlertModalComponent,
    ChartDashboardComponent,
    CustomInputComponent,
    InfoModalComponent,
    CustomSelectComponent,
    PageNotFoundComponent,
    ConfirmModalComponent,
    CustomListComponent,
    AnimatedDigitComponent,
    RadialChartComponent,
    PieChartComponent,
    AreaChartComponent,
    ColumnChartComponent,
    StackedChartComponent
    ],
  imports: [
    CalendarModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    Daterangepicker,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#305ee8",
      "backgroundGradientStopColor": "#5453b2",
      "backgroundStroke": "#e93f3f",
      "maxPercent": 200,
      "units": " %",
      "unitsFontWeight": "400",
      "unitsColor": "#fafafa",
      "outerStrokeGradient": true,
      "outerStrokeColor": "#fbf4f4",
      "outerStrokeGradientStopColor": "#c7c2c2",
      "outerStrokeLinecap": "square",
      "innerStrokeColor": "#a79a9a",
      "titleColor": "#f7f6f2",
      "titleFontSize": "19",
      "titleFontWeight": "600",
      "showSubtitle": false,
      "showInnerStroke": false,
      "clockwise": true,
      "lazy": true})
  ],
  exports: [
    MenuBarComponent,
    AlertModalComponent,
    // ChartDashboardComponent,
    CustomInputComponent,
    InfoModalComponent,
    CustomSelectComponent,
    PageNotFoundComponent,
    ConfirmModalComponent,
    CustomListComponent,
    
  ]
})
export class SharedModule { }
