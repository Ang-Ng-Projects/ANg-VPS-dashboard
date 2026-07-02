import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service'
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
var moment = require('moment');
var FileSaver = require('file-saver');

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  ticketData: any;
  showTicketModal: boolean;

  visitorsList: any;
  patientList: any = [];
  regionList: any = [];
  branchList: any = [];
  deptList: any = [];
  physicianList: any = [];
  searchDatas: any;
  attachments: any;
  totalRecords: any;

  initValues = {
    title: 'Appointment',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input',
      },
      {
        label: 'Patient Id',
        controlName: 'patientIdFilter',
        type: 'input'
      },
      {
        label: 'Language',
        controlName: 'language',
        type: 'select',
        list:[
          {
            key: 'English',
            value: 'English'
          },
          {
            key: 'Arabic',
            value: 'Arabic'
          }
        ]
      },
      
      // {
      //   label: 'Appointment Id',
      //   controlName: 'appointmentId',
      //   type: 'input'
      // },
      {
        label: 'Region',
        controlName: 'regionFilter',
        type: 'select',
        list:this.regionList
      },
      {
        label: 'Branch',
        controlName: 'facilityFilter',
        type: 'select',
        list:this.branchList
      },
      {
        label: 'Department',
        controlName: 'departmentNameFilter',
        type: 'select',
        list:this.deptList
      },
      {
        label: 'Physician name',
        controlName: 'physicianNameFilter',
        type: 'select',
        list: this.physicianList
      },
      
      // {
      //   label: 'Appointment Date',
      //   controlName: 'appointmentDate',
      //   type: 'input'
      // }
    ],
    header: ['SNo', "Date & Time", 'Mobile Number', 'Language', "Patient Id",  "Appointment Id", "Region", "Branch", "Department", "Physician Name", "Appointment Date", "Slot Time" ], // table headers
  }
  customListDatas: {};

  constructor(
    private enterpriseService: EnterpriseApiService,
    private toasterService: ToasterService,
    private utilityService: UtilityService 
  ) {
    // this.getAppointmentPatientList();
  }

  ngOnInit(): void {    
    
    this.getAppointmentList();    
  }

  async getAppointmentPatientList() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getAppointmentPatientId(params);

    console.log('Visitors filter', visitors)

    const appiyoError = visitors?.Error;
    if (appiyoError == '0') {

      const processVariables = visitors['ProcessVariables']
      
      this.regionList = processVariables['regionList'] || [];
      this.branchList = processVariables['branchList'] || [];
      this.deptList = processVariables['deptList'] || [];
      this.physicianList = processVariables['physicianList'] || [];
      // console.log('test', this.patientList[0].label)
      // this.changeDetectorRef.detectChanges(); 

      
    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'patient id list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
  }

  async getAppointmentList(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      // isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    
   
      
    console.log('params', params);

    const visitors: any = await this.enterpriseService.getAppointmentList(params);

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
      this.visitorsList = processVariables['appointmentList'] || [];
      
      this.customListDatas = {
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: this.totalCount,
        totalRecords: this.totalRecords,
        data: this.visitorsList,
        appointment : true,
        keys: ['SNo', "createdDateAndTime", 'reg_mobile_number', 'language', "patientId", "appointmentReferenceNumber", "regionName", "facilityName", "departmentName", "physicianName", "appointmentDate", "slotStartTime"],  // To get the data from key
      }

    } else {
      this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Appointment list error' : visitors['ProcessVariables']?.errorMessage, 'Visitors')
    }
    if(this.regionList.length==0) {
      await this.getAppointmentPatientList();
      this.initValues.formDetails[3].list = this.regionList;
      this.initValues.formDetails[4].list = this.branchList;
      this.initValues.formDetails[5].list = this.deptList;
      this.initValues.formDetails[6].list = this.physicianList;
    }
  }


  // async onDownloadCsv(event) {
  //   var params;
  //   if (!event.fromDate && !event.toDate) {
  //     params = {
  //       fromDate: moment().format("YYYY-MM-DD"),
  //       toDate: moment().format("YYYY-MM-DD"),
  //       // isApplyFilter: false,
  //       isCSVDownload: true,
  //       ...event
  //     }
  //   }
  //   else {
  //     params = {

  //       // isApplyFilter: false,
  //       isCSVDownload: true,
  //       ...event
  //     }
      
  //   }

  //   console.log('params', params);

  //   const visitors: any = await this.enterpriseService.appointmentCsvDownload(params);

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

  async onDownloadCsv(event) {
    // event.ProcessVariables.test1 = ''
    // event.ProcessVariables.test1 = this.totalServiceRecords;
    var params;
    console.log(event, 'testtsts')
    // if (!event.fromDate && !event.toDate) {
    //   params = {
    //     fromDate: moment().format("YYYY-MM-DD"),
    //     toDate: moment().format("YYYY-MM-DD"),
    //     // isApplyFilter: false,
    //     isCSVDownload: true,
    //     ...event
    //   }
    // }
    // else {
      // {
      //   "processId":"f5d97a83bfdf11ec892b000d3a6c1b79",
      //   "ProcessVariables":{
      //     ...event
      //   },
      //   "workflowId":"f5d97a83bfdf11ec892b000d3a6c1b79",
      //   "projectId":"6243fb661e9ce97dd02b8665"
      //   }
      if(event.fromDate && event.toDate  ){
      params = {
        "processId":"ab36428c4d1e11ecb55d0022480d6e6c",
        "ProcessVariables":{
              ...event,
              test1: this.totalRecords
            },
       
        "workflowId":"ab2508a04d1e11ecb55d0022480d6e6c",
        "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
        }
        
    

    params = JSON.stringify(params)

    console.log('params', params);
        // params = JSON.parse(params)
        this.enterpriseService.appointmentCsvDownload(params).subscribe(visitors => {
          this.toasterService.updateMessage('Downloaded');
          var a = document.createElement('a');
          a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(visitors);
          a.target = '_blank';
          a.download = 'appointment.csv';
          document.body.appendChild(a);
          a.click();
          
          // var blob = new Blob([visitors], {type: 'text/csv'});
          // FileSaver.saveAs(blob, "appointment.csv");
          // this.utilityService.onDownloadCsv(visitors);
        // const appiyoError = visitors?.Error;
        // const apiErrorCode = visitors.ProcessVariables?.errorCode;
        // const errorMessage = visitors.ProcessVariables?.errorMessage;
    
        // if (appiyoError == '0') {
    
        //   const processVariables = visitors['ProcessVariables']
    
        //   this.attachments = processVariables?.attachment;
        //   this.utilityService.onDownloadCsv(this.attachments);
    
    
        // } else {
        //   this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Reports')
        // }
        })
    
      // this.utilityService.onDownloadCsv(visitors);
    // const appiyoError = visitors?.Error;
    // const apiErrorCode = visitors.ProcessVariables?.errorCode;
    // const errorMessage = visitors.ProcessVariables?.errorMessage;

    // if (appiyoError == '0') {

    //   const processVariables = visitors['ProcessVariables']

    //   this.attachments = processVariables?.attachment;
    //   this.utilityService.onDownloadCsv(this.attachments);


    // } else {
    //   this.toasterService.showError(visitors['ProcessVariables']?.errorMessage == undefined ? 'Download error' : visitors['ProcessVariables']?.errorMessage, 'Reports')
    // }
    

    
      }
      else{
        this.toasterService.showError('Please choose a date range upto two months to download reports', 'Download Error')
      }
  }




  async pageChangeEvent(event) {
    console.log(event)
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getAppointmentList(this.searchDatas)
  }


  applyAndClear(event?) {
    //this.isApplyClicked = true;
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getAppointmentList(this.searchDatas)
  }


}
