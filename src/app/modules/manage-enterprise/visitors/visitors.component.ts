import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var FileSaver = require('file-saver');
var moment = require('moment');
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {


  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  ticketData: any;
  showTicketModal: boolean;

  wabaList: any = [];

  visitorsList: any;
  searchDatas: any;
  attachments: any;
  totalRecords: any;

  initValues = {
    title: 'Appointment Conversion',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input'
      },
      {
        label: 'Waba Number',
        controlName: 'waba_no',
        type: 'select',
        list: this.wabaList
      },
      // {
      //   label: 'Name',
      //   controlName: 'userName',
      //   type: 'input'
      // }
    ],
    header: ['SNo', "Date" , "Time", 'Mobile Number', "Waba Number", "Action"], // table headers
  }
  customListDatas: {};
  appointmentRating: any;
  totalAppointment: any;
  totalVisitors: any;

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getAppointmentConversationList()
  }

  async getConversionFilter() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getConversionFilter(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']
      
      this.wabaList = processVariables['wabaList'] || [];
      // console.log('test', this.patientList[0].label)
      // this.changeDetectorRef.detectChanges(); 

      
    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'patient id list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }

  async getAppointmentConversationList(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    console.log('params', params);
    if (!params.fromDate && !params.toDate && !params.waba_no) {
      params.fromDate = moment().format("YYYY-MM-DD"),
      params.toDate = moment().format("YYYY-MM-DD")
    }

    const visitors: any = await this.enterpriseService.getConversationList(params);

    console.log('Visitors', visitors)

    const appiyoError = visitors?.Error;
    const apiErrorCode = visitors.ProcessVariables?.errorCode;
    const errorMessage = visitors.ProcessVariables?.errorMessage;

    if (appiyoError == '0' && apiErrorCode == "200") {

      const processVariables = visitors['ProcessVariables']
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.totalRecords = processVariables?.totalItems;
      this.totalVisitors = processVariables?.totalCount;
      this.totalAppointment = processVariables?.totalAppointment;
      this.appointmentRating = processVariables?.appointmentRating;
      this.visitorsList = processVariables['appointmentConversionList'] || [];

      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        totalVisitors: this.totalVisitors,
        totalAppointment: this.totalAppointment,
        appointmentRating: this.appointmentRating,
        conversion : true,
        appointment : false,
        data: this.visitorsList,
        keys: ['SNo', "createdDate", "createdTime", 'mobileNumber', "waba_no", "isVisitorORBookedUser"],  // To get the data from key
      }

    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Appointment conversion list' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
    if(this.wabaList.length==0) {
      await this.getConversionFilter();
      this.initValues.formDetails[1].list = this.wabaList;
    }
  }


  async onDownloadCsv(event) {
    var params;
    if(event.fromDate && event.toDate  ){
        params = {
          "processId":"ab30258c4d1e11ecb55d0022480d6e6c",
          "ProcessVariables":{
                ...event,
                test1: this.totalRecords
              },
         
          "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
          "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
          }
          
      
     
  
      params = JSON.stringify(params)
  
      console.log('params', params);
          this.enterpriseService.conversationCsvDownload(params).subscribe(visitors => {
            this.toasterService.updateMessage('Downloaded');
            var a = document.createElement('a');
            a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(visitors);
            a.target = '_blank';
            a.download = 'appointment_conversion.csv';
            document.body.appendChild(a);
            a.click();
            // var blob = new Blob([visitors], {type: 'text/csv'});
            // FileSaver.saveAs(blob, "appointment_conversion.csv");
        })
  }
else{
  this.toasterService.showError('Please choose a date range upto two months to download reports', 'Download Error') //first string is error msg we want to show in frontend, second string header error message
}
  }
  // async onDownloadCsv(event) {

  //   var params;
  //   if (!event.fromDate && !event.toDate) {
  //     params = {
  //       fromDate: moment().format("YYYY-MM-DD"),
  //       toDate: moment().format("YYYY-MM-DD"),
  //       isApplyFilter: false,
  //       isCSVDownload: true,
  //       ...event
  //     }
  //   }
  //   else {
  //     params = {

  //       isApplyFilter: false,
  //       isCSVDownload: true,
  //       ...event
  //     }
      
  //   }

  //   console.log('params', params);

  //   const visitors: any = await this.enterpriseService.conversationCsvDownload(params);

  //   console.log('Visitors', visitors)

  //   const appiyoError = visitors?.Error;
  //   const apiErrorCode = visitors.ProcessVariables?.errorCode;
  //   const errorMessage = visitors.ProcessVariables?.errorMessage;

  //   if (appiyoError == '0' && apiErrorCode == "200") {

  //     const processVariables = visitors['ProcessVariables']

  //     this.attachments = processVariables?.attachment;
  //     this.utilityService.onDownloadCsv(this.attachments);


  //   } else {
  //     this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
  //   }
  // }




  async pageChangeEvent(event) {
    console.log(event)
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getAppointmentConversationList(this.searchDatas)
  }


  applyAndClear(event?) {
    //this.isApplyClicked = true;
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getAppointmentConversationList(this.searchDatas)
  }

}
