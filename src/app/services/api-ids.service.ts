import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiIdsService {
  api = {


    //vps apis
    getFeedbackChartData: {
      // workflowId: '116b2bfcdb4611ec84290022480d6e6c', //uat
      workflowId: '47992b864dc811ecb55f0022480d6e6c',    //live
      processId: '116b2bfcdb4611ec84290022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getRetailerStatus: {
      // workflowId: '93d5b544519911ecb58f0022480d6e6c', //uat
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',    //live
      processId: '93d5b544519911ecb58f0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    feedbackList: {
      // workflowId: 'c8cc9af44c2d11ecb54e0022480d6e6c', //uat
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c',      //live
      processId: 'c8cc9af44c2d11ecb54e0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getAppointment: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: '56938f604cf511ecb5590022480d6e6c', //live
      processId: '56938f604cf511ecb5590022480d6e6c',
      projectId: environment.projectIds.vps
    },

    //live agent
    getLiveAgentAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c', //live
      processId: '0a2723b24c5a11ecb5500022480d6e6c',
      projectId: environment.projectIds.vps
    },

    //Lab agent
    getLabAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: '628dbe44d8299cd2b49dd676', //live
      processId: '8be93628b8bb11edb9ba0242ac110002',
      projectId: environment.projectIds.vps
    },

    //Hospital
    getHospitalAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: '628dbe44d8299cd2b49dd676', //live
      processId: 'aa953534b8c211edb06e0242ac110002',
      projectId: environment.projectIds.vps
    },

    //Hospital
    getAnaLiveAPI: {

      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'b0d70f66bca111eda85d0242ac110002', //live
      processId: 'b0f73638bca111edb4550242ac110002',
      projectId: environment.projectIds.vps
    },

    //Hospital
    getAnaVisAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'b0d70f66bca111eda85d0242ac110002', //live
      processId: '8eb99032bcda11edbe5c0242ac110002',
      projectId: environment.projectIds.vps
    },

    //Hospital
    getAnaAgentAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'b0d70f66bca111eda85d0242ac110002', //live
      processId: '492118e0bce611ed994e0242ac110002',
      projectId: environment.projectIds.vps
    },

    //appoinment conversation Api
    getConversation: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c', //live
      processId: 'e22457584c5a11ecb5500022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getMilestone: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: 'c8b4fb1a4c2d11ecb54e0022480d6e6c', //live
      processId: 'ed7dcbd44cf511ecb5590022480d6e6c',
      projectId: environment.projectIds.vps
    },
    getActivity: {
      // workflowId: '898eb67a422711ecaa3f727d5ac274b2', //uat
      workflowId: '898eb67a422711ecaa3f727d5ac274b2', //live
      processId: '08f2ed86446811ecaa43727d5ac274b2',
      projectId: environment.projectIds.vps
    },
    // getChartData: {
    //   // workflowId: '19f8d2b634dc11ed87eb0242ac110002', //uat
    //   workflowId: '19f8d2b634dc11ed87eb0242ac110002', //live
    //   processId: '19f8d2b634dc11ed87eb0242ac110002',
    //   projectId: environment.projectIds.vps
    // },


    getChartData: {
      // workflowId: '19f8d2b634dc11ed87eb0242ac110002', //uat
      workflowId: '684917bf83465934f28d403f', //live
      processId: '47a8532c4dc811ecb55f0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    getAnaAppChartData: {
      // workflowId: '19f8d2b634dc11ed87eb0242ac110002', //uat
      workflowId: 'b0d70f66bca111eda85d0242ac110002', //live
      processId: '07a5000cbcc811ed99ba0242ac110002',
      projectId: environment.projectIds.vps
    },
    getAnaPatientChartData: {
      // workflowId: '19f8d2b634dc11ed87eb0242ac110002', //uat
      workflowId: '65eefcff1baf4f36a5b44bf3', //live
      processId: 'fba99bc8df9911ee8bd40242ac110005',
      projectId: environment.projectIds.vps
    },
    getConversionChartData: {
      // workflowId: '635a34213c67c30263857c98', //uat
      workflowId: '47992b864dc811ecb55f0022480d6e6c', //live
      processId: '186630e867a411ecb8da0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    getLangAnaChartData: {
      // workflowId: '635a34213c67c30263857c98', //uat
      workflowId: 'b0d70f66bca111eda85d0242ac110002', //live
      processId: '36fd324ebcae11ed99ba0242ac110002',
      projectId: environment.projectIds.vps
    },

    liveAgentCsv: {
      // workflowId: '635a34213c67c30263857c91', //uat
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c', //live
      processId: 'ab2b1c724d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    //////milestone report
    appoitmentCsv: {
      // workflowId: '635a34213c67c30263857c91', //uat
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c', //live
      processId: 'ab36428c4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    milestoneCsv: {
      // workflowId: '635a34213c67c30263857c91', //uat
      workflowId: 'd56382f29aab11f083a80242ac110009', //live
      processId: 'd57c610a9aab11f0b0ce0242ac110009',
      projectId: environment.projectIds.vps
    },
    convarsationCsv: {
      // workflowId: '635a34213c67c30263857c91', //uat
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c', //live
      processId: 'ab30258c4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    // milestoneCsv: {
    //   // workflowId: '635a34213c67c30263857c91', //uat
    //   workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c', //live
    //   processId: 'ab3829624d1e11ecb55d0022480d6e6c',
    //   projectId: environment.projectIds.vps
    // },
    feedbackCsv: {
      // workflowId: '635a34213c67c30263857c91',  //uat
      workflowId: 'ab2508a04d1e11ecb55d0022480d6e6c',  //live
      processId: 'ab2959fa4d1e11ecb55d0022480d6e6c',
      projectId: environment.projectIds.vps
    },
    activityCsv: {
      // workflowId: 'acac77d045fd11ecaa74727d5ac274b2', //uat
      workflowId: 'acac77d045fd11ecaa74727d5ac274b2',  //live
      processId: 'acac77d045fd11ecaa74727d5ac274b2',
      projectId: environment.projectIds.vps
    },

    regionData: {
      // workflowId: '635a34213c67c30263857c90', //uat
      workflowId: '628dbe44d8299cd2b49dd679',  //live
      processId: 'e94189a8327c11ed8c9f0022480d6e6c',
      projectId: environment.projectIds.vps
    },

    appointmentPatientID: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: 'acc5316837e611ed8c760242ac110002',  //live
      processId: 'acc5316837e611ed8c760242ac110002',
      projectId: environment.projectIds.vps
    },

    feedbackFilter: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: '89a69bac380611edbcdf0242ac110002',  //live
      processId: '89a69bac380611edbcdf0242ac110002',
      projectId: environment.projectIds.vps
    },

    liveAgentFilter: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: '68e874f23a3711edaa0a0242ac110002',  //live
      processId: '68e874f23a3711edaa0a0242ac110002',
      projectId: environment.projectIds.vps
    },

    patient: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: '65ead03f1baf4f36a5bceaa6',  //live
      processId: '55939de6dd2411eea4cc0242ac110005',
      projectId: environment.projectIds.vps
    },

    facilityFilter: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: 'ac936f7a37e611edaf300242ac110002',  //live
      processId: '583615bcb8de11ed8c930242ac110002',
      projectId: environment.projectIds.vps
    },

    milestoneFilter: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: '6019c08e3a3b11edbe9e0242ac110002',  //live
      processId: '6019c08e3a3b11edbe9e0242ac110002',
      projectId: environment.projectIds.vps
    },

    conversionFilter: {
      // workflowId: '635a34213c67c30263857cae',  //uat
      workflowId: '76e71fae3a3c11ed8c760242ac110002',  //live
      processId: '76e71fae3a3c11ed8c760242ac110002',
      projectId: environment.projectIds.vps
    },

    getpharmacyAPI: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: '64f6dc23afb99f896a30bdf0', //live
      processId: '6fc11bea4bbf11ee94200242ac110002',
      projectId: environment.projectIds.vps
    },


    RemainderAppointmentId: {
      // workflowId: '635a34213c67c30263857c9e', //uat
      workflowId: '1258c28278e011f082210242ac110009', //live
      processId: '1263845678e011f09cf90242ac110009',
      projectId: environment.projectIds.vps
    },
  };
}
