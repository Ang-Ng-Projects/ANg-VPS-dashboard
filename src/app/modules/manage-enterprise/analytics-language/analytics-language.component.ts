import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
var FileSaver = require('file-saver');
import { ApexChart, ApexLegend, ApexNonAxisChartSeries,ApexStroke,
  ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ChartComponent } from "ng-apexcharts";
import { DateRangeService } from '@services/date-range.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

export type ChartOptions = {
 series: ApexNonAxisChartSeries;
 chart: ApexChart;
 labels: string[];
 colors: string[];
 
 legend: ApexLegend;
 plotOptions: ApexPlotOptions;
 responsive: ApexResponsive | ApexResponsive[];
 title: ApexTitleSubtitle;
 fill: any;
 stroke: ApexStroke;
 
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-language-mile',
  templateUrl: './analytics-language.component.html',
  styleUrls: ['./analytics-language.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  
})
export class AnalyticsLanguageComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions>;
  processVariables: any;
  xAxisType = '1';
  fromDate: Date[];
  arabicCount: number;
  engCount: number;
  arabicPer: any;
  engPer: any;
  test: any = '1';
  public daterange: any = {};
  selectedOption: any;
  list: any =[
    {
    key: 'Last 30 Days',
    from: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
    },
    {
      key: 'Last 2 months',
      from: moment().subtract(2, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
      },
      {
        key: 'Last 3 months',
        from: moment().subtract(3, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
        },
        {
          key: 'Last 6 months',
          from: moment().subtract(6, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
          },
          {
            key: 'Last 9 months',
            from: moment().subtract(9, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
            },
            {
              key: 'Last 12 months',
              from: moment().subtract(12, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
              },
  ]

  options: any;
  dateRangeValue: String = '';
  searchFromDate: any = '';
  searchToDate: any = '';

  total1: any;
  total2: any;
  total3: any;

  constructor(
    private enterpriseApiService: EnterpriseApiService, 
    private toasterService: ToasterService,
    private utilityService: UtilityService,
    private dateService: DateRangeService,
  ) {
    // this.getAppointmentPatientList();
    this.chartOptions = {
      series: [],
      chart: {
        width: 360,
        type: "pie",
        toolbar: {
          show: true,
          tools: {
            download: true
          },
          offsetX: -5
        }
        
      },
      labels: ["Arabic", "English"],
      title: {
        text: "Appointment Language Preference"
      },
      colors: ['#56C5F8', '#5869BF'],
      fill: {
        type: "gradient",
        opacity: 1,
        // pattern: {
        //   enabled: true,
        //   style: [
        //     "verticalLines",
        //     "squares",
        //     "horizontalLines",
        //     "circles",
        //     "slantedLines"
        //   ]
        // }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions2 = {
      series: [],
      chart: {
        height: 300,
        type: "radialBar",

        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      title: {
        text: "Appointment - English Preference"
      },
      labels: ["English"]
    };
    this.chartOptions3 = {
      series: [],
      chart: {
        height: 300,
        type: "radialBar",

        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      title: {
        text: "Appointment - Arabic Preference"
      },
      labels: ["Arabic"]
    };
  }

  ngOnInit(): void {    
    this.getChart();
    
    console.log('dtaa', this.dateRangeValue)
    this.options = {
      autoUpdateInput: false,
      alwaysShowCalendars: false,
      
      showCustomRangeLabel: false,
      autoApply: true,
      locale: { format: 'YYYY-MM-DD',
      applyLabel: 'ok' },
      // alwaysShowCalendars: true,
      startDate: moment().subtract(12, 'days'),
      endDate: this.dateService.getWhichDay(0),
      //minDate: this.dateService.getLastTweleveMonthDate(),
      maxDate: new Date(),
      ranges: {
        'Last 30 Days': [this.dateService.getWhichDay(29)],
        'Last 2 months': [moment().subtract(2, 'months')],
        'Last 3 months': [moment().subtract(3, 'months')],
        'Last 6 months': [moment().subtract(6, 'months')],
        'Last 9 months': [moment().subtract(9, 'months')],
        'Last 12 months': [moment().subtract(12, 'months')],
        // 'This Month': [moment().startOf('month'), moment().endOf('month')],
        // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    };
    
    
    
  }

  

  async getChart() { 
    console.log('dataaaaa', this.selectedOption)
    try {
      var params;
    console.log('from', this.fromDate)

    if (this.fromDate?.length >= 1) {
      params = {
        "fromDate": moment(this.fromDate[0]).format('YYYY-MM-DD') || '',
          "toDate": moment(this.fromDate[1]).endOf('month').format('YYYY-MM-DD') || ''     
      }
    } else {
      params = {
        "fromDate": '',
        "toDate": ''     
      }
    }
    
      const response: any = await this.enterpriseApiService.getLanguageAnaChart(params);
      console.log('getChartbookappiontment', response);

      const Error = response?.Error;
      const ErrorCode = response?.ErrorCode;
      const ErrorMessage = response?.ErrorMessage;

      this.processVariables = response?.ProcessVariables
     
      if (Error == '0' ) {
  
        // const appointmentCount = this.processVariables.appointmentBookingCount;
        this.arabicCount = parseInt(this.processVariables.languageCount[0]);
        this.engCount = parseInt(this.processVariables.languageCount[1]);
        this.arabicPer = this.processVariables.arabicPercentage;
        this.engPer = this.processVariables.englishPercentage;
        this.total1 = this.processVariables['englishPercentage'] || '';
      this.total2 = this.processVariables['count'] || '';
      this.total3 = this.processVariables['totalPercentage'] || '';

        // const year = this.processVariables.xAxis;
        const graphCounts = [{
         "graphCount" : this.arabicCount,
          
        },
      {
        "graphCount" : this.engCount,
         
      }]
        // this.lineChartLabels = [];
        // this.lineChartData = [{ data: [],
        //   label: 'Count' }];
        let yAxis = []
        let xAxis = [];
        graphCounts.forEach((graph) => {

          yAxis.push(graph.graphCount);
        })
        console.log(yAxis)
        this.chartOptions.series = yAxis;
        this.chartOptions2.series = [this.engPer];
        this.chartOptions3.series = [this.arabicPer];
      }
      else {
        if (ErrorMessage === undefined) {
          return;
        }
        // this.toasterService.showError(ErrorMessage == undefined ? 'Chart error' : ErrorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }

  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);
    this.test = '2'
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;


    const startDate = this.dateService.getTicketDateFormat(value.start['_d']);
    const endDate = this.dateService.getTicketDateFormat(value.end['_d']);

    this.searchFromDate = startDate;

    this.searchToDate = endDate;

    this.dateRangeValue = `${this.searchFromDate} - ${this.searchToDate}`
  }

  clearDate() {
  
    this.fromDate = null;
    this.searchToDate = '';
    this.dateRangeValue = '';
    this.selectedOption = null
    this.getChart();
    this.toasterService.showSuccess('Filter Cleared Successfully', 'Analytics')
  }

  apply() {
    this.getChart()
    this.toasterService.showSuccess('Filter Applied Successfully', 'Analytics')
  }

}
