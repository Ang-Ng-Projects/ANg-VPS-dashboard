import { Component, OnInit} from '@angular/core';
import { EnterpriseApiService } from '@services/enterprise-api.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
import { EncryptService } from '@services/encrypt.service';
var moment = require('moment');
var FileSaver = require('file-saver');
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  allTickets: Array<any> = [];
  page: number = 1;
  itemsPerPage: number = 8;
  totalCount: number;
  
  searchFromDate: any = '';
  searchToDate: any = '';
 
  wabaList: any = [];

  searchDatas: any;
  attachments: any;
  totalRecords: any;
  initValues = {
    title: 'Lab Medication',
    formDetails: [
      {
        label: 'Mobile Number',
        controlName: 'mobileNumber',
        type: 'input',
      },
     
     
    ],
    header: ['SNo', "Date & Time", "Mobile Number","WABA No", 'Channel', 'Device Type'], // table headers
  }

  customListDatas= {}
  agentValue: boolean;

  constructor(
    private enterpriseService: EnterpriseApiService, 
    private toasterService: ToasterService, 
    private utilityService: UtilityService,
    public encryption: EncryptService
  ) {}



  ngOnInit(): void {
    this.getLiveAgentData()
  }

  async getFeedbackFilter() {
    const params = {
    }

    console.log('params', params);

    const visitors: any = await this.enterpriseService.getLiveAgentFilter(params);

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

  async getLiveAgentData(searchData?) {
    const params = {
      currentPage: this.page || 1,
      perPage: this.itemsPerPage || 10,
      isApplyFilter: false,
      isCSVDownload: true,
      ...searchData
    }

    

    console.log('params', params)

    const ticketsData: any = await this.enterpriseService.getLabList(params);

    console.log('Tickets Data', ticketsData)

    const appiyoError = ticketsData?.Error;
    const apiErrorCode = ticketsData.ProcessVariables?.errorCode;
    const errorMessage = ticketsData.ProcessVariables?.errorMessage;
    

    if (appiyoError == '0' && apiErrorCode == "200") {
      const processVariables = ticketsData['ProcessVariables']
      
      this.itemsPerPage = processVariables['perPage'];
      let totalPages = processVariables['totalPages'];
      this.totalCount = Number(this.itemsPerPage) * Number(totalPages);
      this.allTickets = processVariables['output_data'] || [];
      this.totalRecords = processVariables?.totalItems;
      
      this.customListDatas = {
        agentValue : true,
        itemsPerPage: this.itemsPerPage,
        perPage: this.page,
        totalCount: processVariables['totalCount'],
        totalRecords: processVariables['totalCount'],
        data: this.allTickets,
        appointment : true,
        keys: ['id', "created_at", "mobile_number","waba_number", "channel", "deviceType"],  // To get the data from key
      }    
  } else {
      
      this.toasterService.showError(ticketsData['ProcessVariables']?.errorMessage == undefined ? 'Live agent list' : ticketsData['ProcessVariables']?.errorMessage, 'Tickets')
    }
    // if(this.wabaList.length==0) {
    //   await this.getFeedbackFilter();
    //   this.initValues.formDetails[3].list = this.wabaList;
    // }
  }

  async onDownloadCsv(event) {
    var params;
    if(event.fromDate && event.toDate  ){
        params = {
          "processId":"f5cd8bacb8c511ed9d780242ac110002",
          "ProcessVariables":{
                ...event,
                test1: this.totalRecords
              },
         
          "workflowId":"f5cd8bacb8c511ed9d780242ac110002",
          "projectId":"603dcdb6dbeb11ec84380022480d6e6c"
          }
          
      
     
  
      params = JSON.stringify(params)
  
      console.log('params', params);
          this.enterpriseService.liveAgentCsvDownload(params).subscribe(visitors => {
            this.toasterService.updateMessage('Downloaded');
            var a = document.createElement('a');
            a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(visitors);
            a.target = '_blank';
            a.download = 'Lab Medication.csv';
            document.body.appendChild(a);
            a.click();
            // var blob = new Blob([visitors], {type: 'text/csv'});
            // FileSaver.saveAs(blob, "Lab Medication.csv");
        })
  }
  else{
    this.toasterService.showError('Please choose a date range upto two months to download reports', 'Download Error')
  }
}

  // async onDownloadCsv(event){
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
  //   const ticketsData: any = await this.enterpriseService.liveAgentCsvDownload(params);
  //   console.log('Tickets Data', ticketsData)

  //   const appiyoError = ticketsData?.Error;
  //   const apiErrorCode = ticketsData.ProcessVariables?.errorCode;
  //   const errorMessage = ticketsData.ProcessVariables?.errorMessage;

  //   if (appiyoError == '0' && apiErrorCode == "200") {
  //     const processVariables = ticketsData['ProcessVariables']
  //     this.attachments= processVariables?.attachment;
  //     this.utilityService.onDownloadCsv(this.attachments);
      
  // } else {
  //     this.toasterService.showError(ticketsData['ProcessVariables']?.errorMessage == undefined ? 'Download error' : ticketsData['ProcessVariables']?.errorMessage, 'Tickets')
  //   }  
  // }


  async pageChangeEvent(event) {
    this.page = event.pageIndex;
    this.searchDatas = event.searchDatas
    this.getLiveAgentData(this.searchDatas)
    
  }

  applyAndClear(event) {
    this.searchDatas = event.searchDatas;
    this.page = event.pageIndex;
    this.getLiveAgentData(this.searchDatas)
  }




}
