import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
var FileSaver = require('file-saver');
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { DateRangeService } from '@services/date-range.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: string[];
  labels: string[];
};

@Component({
  selector: 'app-patient-mile',
  templateUrl: './analytics-patient.component.html',
  styleUrls: ['./analytics-patient.component.css']
})
export class AnalyticsPatientComponent implements OnInit {

  @ViewChild("chart2") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  processVariables: any;
  xAxisType = '1';
  @Input() xAxis: any;
  @Input() active: any;
  @Input() count: any;
  
  @Input() toDate: any;

  lineChartLabels: string[];

  public daterange: any = {};

  options: any;
  dateRangeValue: String = '';
  searchFromDate: any = '';
  searchToDate: any = '';

  fromDate: Date[];
  
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

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService,
    private dateService: DateRangeService,
  ) {
    // this.getAppointmentPatientList();
    this.chartOptions = {
      series: [
        {
          name: "Registration Count",
          data: []
        }
      ],
      chart: {
        height: 450,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          },
          colors: {
            
          },
        },
        
      },
      dataLabels: {
        enabled: true,
       
        // formatter: function(val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#673AB7"]
        }
      },

      labels: [],
     
      // colors: ['#FD6E88'],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["#673AB7"],
          stops: [0, 100],
          opacityFrom: 0.8,
          opacityTo: 0.9
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        // labels: {
        //   show: false,
        //   formatter: function(val) {
        //     return val + "%";
        //   }
        // }
      },
      title: {
        text: "",
        
      }
    };
  }

  ngOnInit(): void {    
    this.getChart();
    this.options = {
      autoUpdateInput: false,
      alwaysShowCalendars: false,
      showCustomRangeLabel: false,
      autoApply: true,
      locale: { format: 'YYYY-MM-DD',
      applyLabel: 'ok' },
      // alwaysShowCalendars: true,
      startDate: moment().subtract(12, 'months'),
      endDate: this.dateService.getWhichDay(1),
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
    
    // this.lineChartData = [{ data: [],
    // }];

    
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
      const response: any = await this.enterpriseService.getPaitentAnaChart(params);
      console.log('getChart patient', response);

      const appiyoError = response?.Error;
      const apiErrorCode = response.ProcessVariables?.errorCode;
      const errorMessage = response.ProcessVariables?.errorMessage;

      this.processVariables = response?.ProcessVariables
     
      if (appiyoError == '0') {
  
        const graphCounts = this.processVariables.registrationList;
        
        this.lineChartLabels = [];
        // this.lineChartData = [{ data: [],
        //   // label: totalCount 
        //   label : "Average Count: " + parseInt(totalCount)
        // }];
        let yAxis = []
        let xAxis = [];
        let high: any;
        let low: any;
        graphCounts.forEach((graph) => {
          graph.graphDateLabel= graph.outputMonth.slice(0,3) + ' ' + graph.year
          graph.graphDate= graph.outputMonth + ' ' + graph.year
          xAxis.push(graph.graphDateLabel);
            yAxis.push(graph.count);
          if(graph.graphDate == this.processVariables.highestApptMonth) {
            high = parseInt(graph.count)
            
          }
          if(graph.graphDate == this.processVariables.lowestApptMonth) {
            low = parseInt(graph.count)
            
          } else {
            
          }
        })

        
        this.lineChartLabels= xAxis;
        this.chartOptions.series[0].data = yAxis;
        
        this.chartOptions.labels = this.lineChartLabels;
        this.chartOptions.plotOptions.bar.colors = {
          ranges: [
            {
              from: high,
              to: high,
              color: "#7BC74D"
            },
            {
              from: low,
              to: low,
              color: "#FF5E75"
            }
          ]
        }

       
        
        this.chartOptions.dataLabels.formatter =  function(val, opt) {
          if(val == high || val == low) {
            
            return  '🔯 ' + val
          } else {
            
            return  val
          }
          
      }

      
       
      }
      else {
        if (errorMessage === undefined) {
          return;
        }
        // this.toasterService.showError(errorMessage == undefined ? 'Chart error' : errorMessage, 'Dashboard Chart')
      }
    } catch (err) {
      console.log("Error", err);
    }


  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);

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
    this.getChart();
    this.toasterService.showSuccess('Filter Cleared Successfully', 'Analytics')
  }

  apply() {
    this.getChart()
    this.toasterService.showSuccess('Filter Applied Successfully', 'Analytics')
  }

}
