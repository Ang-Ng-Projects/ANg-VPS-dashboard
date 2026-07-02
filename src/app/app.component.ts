import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'twixor-aggregator';
  
  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const previousUrl = history.state.prevPage ?? null;
    if (!previousUrl) {
      window.sessionStorage.removeItem('appointment download status'); 
      window.sessionStorage.removeItem('feedback download status'); 
      window.sessionStorage.removeItem('live download status'); 
      window.sessionStorage.removeItem('mile download status'); 
      window.sessionStorage.removeItem('conversion download status');      
    }
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('token');
        if (token == undefined) {
          this.router.navigate(['/login']);
        }
      }
    });

    
    // window.addEventListener('unload', (event) => {
    //   if (environment.production) {
    //     this.utilityService.logOut();
    //   }
    // })

    window.addEventListener('beforeunload', (event) => {
      if (environment.production) {
        // this.utilityService.logOut();
        if (!window.location.href.includes('/login')) {
          event.preventDefault()
          event.returnValue = "";
          return false;
        }
        
      }
    });

  }

  ngOnDestroy(){}

}
