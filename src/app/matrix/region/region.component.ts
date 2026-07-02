import { Component, OnInit, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { DateRangeService } from '@services/date-range.service';
import { MatInput } from '@angular/material/input';
var moment = require('moment');
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from '@services/utility.service';
var FileSaver = require('file-saver');
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent implements OnInit {
  // country : any;
  displayedColumns: string[] = ['Country'];
  isLoading = false;
  loadRegion: any;
  loadFacility: any;
  loadDepartment: any;
  loadPhysician: any;
  // datasource = this.country;
  facilitysource: any;
  facilityColumns: string[] = ['hospital'];
  departmentColumns: string[] = ['department'];
  physicianColumns: string[] = ['physician'];
  departmentSource: any;
  physicianSource: any;
  itemsPerPage: any;
  regionSoruce: any;
  regionName: any;
  regionId: any;
  facilityId: any;
  physicianId: any;
  regionCount: any;
  physicianCount: any;
  departmentCount: any;
  facilityCount: any;
  options: any;
  page: Number;
  isApplyClicked: boolean;
  searchDatas: any = {};
  dateRangeValue: String = '';
  public daterange: any = {};
  searchFromDate: any = '';
  searchToDate: any = '';

  fromDate: any = '';
  toDate: any = '';
  maxDate = new Date();

  attachments: any;

  @ViewChild('fromInput', {
    read: MatInput,
  })
  fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput,
  })
  toInput: MatInput;

  selectedActive: Boolean;
  @ViewChild(DaterangepickerComponent)
  private picker: DaterangepickerComponent;

  constructor(
    private enterpriseService: EnterpriseApiService,
    private dateService: DateRangeService,
    private toasterService: ToasterService,
    private utilityService: UtilityService,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    
  }

  ngOnInit(): void {
    
    
    this.options = {
      autoUpdateInput: false,
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: true,
      startDate: this.dateService.getWhichDay(6),
      endDate: this.dateService.getWhichDay(0),
      //minDate: this.dateService.getLastTweleveMonthDate(),
      maxDate: new Date(),
      ranges: {
        Today: [this.dateService.getWhichDay(0)],
        Yesterday: [
          this.dateService.getWhichDay(1),
          this.dateService.getWhichDay(1),
        ],
        'Last 7 Days': [this.dateService.getWhichDay(6)],
        'Last 30 Days': [this.dateService.getWhichDay(29)],
        // 'This Month': [moment().startOf('month'), moment().endOf('month')],
        // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
    };
    const params = {};

    this.getRegionData(params);
   
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

    this.dateRangeValue = `${this.searchFromDate} - ${this.searchToDate}`;
  }

  async getRegionData(params) {
    // const params = {

    // }

    console.log('params', params);

    const regionData: any = await this.enterpriseService.getRegionData(params);

    console.log('region Data', regionData);

    const appiyoError = regionData?.Error;
    const apiErrorCode = regionData.ProcessVariables?.errorCode;
    const errorMessage = regionData.ProcessVariables?.errorMessage;

    if (appiyoError == '0') {
      const regionResponse = regionData['ProcessVariables'];
      console.log('response', regionResponse);
      const metricType = regionResponse.metricType;
      // this.regionCount = regionResponse.totalMetricCount;
      if (regionResponse.selectedDepartment != '') {
        this.physicianSource = regionResponse.metricList;
        this.physicianCount = regionResponse.metricList.reduce((accumulator, value) => {
          return accumulator + value.metricCount;
        }, 0);
        // this.physicianCount = regionResponse.totalMetricCount;
      } else if (regionResponse.selectedFacility != '') {
        this.departmentSource = regionResponse.metricList;
        this.physicianSource = '';
        this.departmentCount = regionResponse.metricList.reduce((accumulator, value) => {
          return accumulator + value.metricCount;
        }, 0);
        // this.departmentCount = regionResponse.totalMetricCount;
      } else if (regionResponse.selectedRegion != '') {
        this.facilitysource = regionResponse.metricList;
        this.departmentSource = '';
        this.physicianSource = '';
        this.facilityCount = regionResponse.metricList.reduce((accumulator, value) => {
          return accumulator + value.metricCount;
        }, 0);
        // this.facilityCount = regionResponse.totalMetricCount;
      } else if (regionResponse.selectedRegion == '') {
        this.regionSoruce = regionResponse.metricList;
        this.departmentSource = '';
        this.physicianSource = '';
        this.regionCount = regionResponse.metricList.reduce((accumulator, value) => {
          return accumulator + value.metricCount;
        }, 0);
        // this.regionCount = regionResponse.totalMetricCount;
      }
    } else {
      this.toasterService.showError(
        regionData['ProcessVariables']?.errorMessage == undefined ? 'Metric Region Wise List' : regionData['ProcessVariables']?.errorMessage,
        'Tickets'
      );
    }
  }

  getDateFilter() {
    if (this.fromInput.value && this.toInput.value) {
      const params = {
        fromDate: moment(this.fromInput.value).format("YYYY-MM-DD"),
        toDate: moment(this.toInput.value).format("YYYY-MM-DD")
      };
      this.facilitysource = '';
      this.getRegionData(params);
      this.toasterService.showSuccess('Date filters applied successfully', 'Success');
    } else {
      this.toasterService.showError(
        'Please fill date fields to apply filter',
        'Error'
      );
    }
  }

  clearDate() {
    this.fromInput.value = '';
    this.toInput.value = '';
    this.toasterService.showSuccess('Date inputs cleared successfully', 'Success');
    const params = {
      fromDate: this.fromInput.value,
      toDate: this.toInput.value,
    };
    this.facilitysource = '';
    this.getRegionData(params);
  }

  getFacility(regionId) {
    // this.regionName  = regionName;
    this.selectedActive = true;
    this.regionId = regionId;
    const params = {
      selectedRegion: this.regionId,
      fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
      toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
    };
    this.getRegionData(params);
  }

  getHospital(facilityId) {
    this.facilityId = facilityId;
    const params = {
      selectedRegion: this.regionId,
      selectedFacility: this.facilityId,
      fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
      toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
    };
    this.getRegionData(params);
  }

  getPhysician(pasicianId) {
    this.physicianId = pasicianId;
    const params = {
      metricType: 'PHYSICIAN',
      selectedRegion: this.regionId,
      selectedFacility: this.facilityId,
      selectedDepartment: this.physicianId,
      fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
      toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
    };
    this.getRegionData(params);
  }

  async onDownloadCsv(event, name, count) {
    var params;
    this.isLoading = true;
    this.ngxUiLoaderService.start();
    if(event == 'region') {
      this.loadRegion=name;
      this.loadFacility='';
      this.loadDepartment='';
      this.loadPhysician='';
      params = {
        "processId":"ab36428c4d1e11ecb55d0022480d6e6c",
        "ProcessVariables":{
          test1: count,
          fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
          toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
          regionFilter: "'"+name+"'"},
        "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
        // "workflowId": "628dbe44d8299cd2b49dd677",
        "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
      }
    } else if (event == 'facility') {
      this.loadFacility=name;
      this.loadRegion='';
      this.loadDepartment='';
      this.loadPhysician='';
      params = {
        "processId":"ab36428c4d1e11ecb55d0022480d6e6c",
        "ProcessVariables":{
          // test1: count,
          test1: count,
        fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
        toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
        regionFilter: "'"+this.regionId+"'",
        facilityFilter: "'"+name+"'"},
        "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
        // "workflowId": "628dbe44d8299cd2b49dd677",
        "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
      }
    } else if (event == 'department') {
      this.loadDepartment=name;
      this.loadPhysician='';
      this.loadRegion='';
      this.loadFacility='';
      params = {
        "processId":"ab36428c4d1e11ecb55d0022480d6e6c",
        "ProcessVariables":{
          test1: count,
        fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
        toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
        regionFilter: "'"+this.regionId+"'",
        facilityFilter: "'"+this.facilityId+"'",
        departmentNameFilter: "'"+name+"'"},
        "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
        "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
      }
    } else if (event == 'physician') {
      this.loadPhysician=name;
      this.loadRegion='';
      this.loadDepartment='';
      this.loadFacility='';
      params = {
        "processId":"ab36428c4d1e11ecb55d0022480d6e6c",
        "ProcessVariables":{
          test1: count,
        fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
        toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
        regionFilter: "'"+this.regionId+"'",
        facilityFilter: "'"+this.facilityId+"'",
        departmentNameFilter: "'"+this.physicianId+"'",
        physicianNameFilter: "'"+name+"'"},
        "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
        "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
      }
    }
    // var params = {
    //   fromDate: this.fromInput.value ? moment(this.fromInput.value).format("YYYY-MM-DD") : '',
    //   toDate: this.toInput.value ? moment(this.toInput.value).format("YYYY-MM-DD") : '',
    //   regionFilter: this.regionId,
    //   facilityFilter: this.facilityId,
    //   departmentNameFilter: this.physicianId
    // };
    

    params = JSON.stringify(params)
  
      console.log('params', params);
          this.enterpriseService.appointmentCsvDownload(params).subscribe(visitors => {
            this.isLoading = false;
            this.ngxUiLoaderService.stop();
            var a = document.createElement('a');
            a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(visitors);
            a.target = '_blank';
            a.download = 'appointment.csv';
            document.body.appendChild(a);
            a.click();
            // var blob = new Blob([visitors], {type: 'text/csv'});
            // FileSaver.saveAs(blob, "appointment.csv");
        })


}



// export interface counrty {
//   no: number;
//   country: string;

// }

// interface facility{
//   no: number;
//   hospital : string;
// }

// interface department{
//   no: number;
//   department : string;
// }

// const ELEMENT_DATA: counrty[] = [
//   {no: 1, country: 'Dubai'},
//   {no: 2, country: 'Sharjah'},
//   {no: 3, country: 'Al Alim'},
//   {no: 4, country: 'Abhudhabi'},

// ];

// const Facility_DATA: facility[] = [
//   {no: 1, hospital: 'hospital 1'},
//   {no: 2, hospital: 'hospital 2'},
//   {no: 3, hospital: 'hospital 3'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
//   {no: 4, hospital: 'hospital 4'},
// ]

// const Department_Data: department[] = [
//   {no: 1, department: 'Dubai'},
//   {no: 2, department: 'Sharjah'},
//   {no: 3, department: 'Al Alim'},
//   {no: 4, department: 'Abhudhabi'},

// ];
}
