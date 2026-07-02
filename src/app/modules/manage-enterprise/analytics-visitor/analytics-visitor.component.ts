import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
var FileSaver = require('file-saver');
import { DateRangeService } from '@services/date-range.service';

@Component({
  selector: 'app-analytics-visitor',
  templateUrl: './analytics-visitor.component.html',
  styleUrls: ['./analytics-visitor.component.css']
})
export class AnalyticsVisitorComponent implements OnInit {


  allTickets: any;
  isNoRecord: boolean;
  header: any;
  table: any;
  max: any;
  min: any;
  minMile: any;
  maxMile: any;
  total1: any;
  total2: any;
  total3: any;

  fromDate: Date[];

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
  

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService,
    private dateService: DateRangeService,
  ) {
    // this.getAppointmentPatientList();
  }

  ngOnInit(): void {    
    this.getLiveAgentData();
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

  async getLiveAgentData() {
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

    

    console.log('params', params)

    const ticketsData: any = await this.enterpriseService.getAnaVis(params);

    console.log('Tickets Data', ticketsData)

    const appiyoError = ticketsData?.Error;
    const apiErrorCode = ticketsData.ProcessVariables?.errorCode;
    const errorMessage = ticketsData.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "1") {
      const processVariables = ticketsData['ProcessVariables']
      this.table = ticketsData['ProcessVariables']
      
      this.isNoRecord = this.table ? false : true;
      this.allTickets = processVariables['appointmentList'] || [];
      // this.header = processVariables['milestoneList'] || [];
      this.min = processVariables['lowestApptMonth'] || '';
      this.max = processVariables['highestApptMonth'] || '';
      this.total1 = processVariables['totalAppmtCount'] || '';
      this.total2 = processVariables['totalVisitorCount'] || '';
      this.total3 = processVariables['totalConvPercent'] || '';

      // this.minMile = processVariables['lowestMilestone'] || '';
      // this.maxMile = processVariables['highestMilestone'] || '';
        
  } else {
      
      this.toasterService.showError(ticketsData['ProcessVariables']?.errorMessage == undefined ? 'Live agent list' : ticketsData['ProcessVariables']?.errorMessage, 'Tickets')
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
    this.getLiveAgentData();
    this.toasterService.showSuccess('Filter Cleared Successfully', 'Analytics')
  }

  apply() {
    this.getLiveAgentData()
    this.toasterService.showSuccess('Filter Applied Successfully', 'Analytics')
  }

}
