import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { EncryptService } from './encrypt.service';
import { environment } from '../../environments/environment';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, tap, first, catchError } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToasterService } from './toaster.service';
import { UtilityService } from './utility.service';
import { MatSnackBar } from "@angular/material/snack-bar";
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  apiCount: number = 0;
  sessionTimeoutCount: number = 0;

  constructor(
    private encrytionService: EncryptService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toasterService: ToasterService,
    private utilityService: UtilityService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.ngxUiLoaderService.start();
    this.apiCount++;
    let httpMethod = req.method;

    const reqBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('request=>', req, 'reqbody=>', reqBody)
    if (reqBody?.processId == 'acc5316837e611ed8c760242ac110002' || reqBody?.processId == '89a69bac380611edbcdf0242ac110002'
      || reqBody?.processId == "68e874f23a3711edaa0a0242ac110002" || reqBody?.processId == "6019c08e3a3b11edbe9e0242ac110002"
      || reqBody?.processId == "76e71fae3a3c11ed8c760242ac110002") {
      this.ngxUiLoaderService.stop();
    }

    else if ((reqBody && reqBody.showLoader !== false) || req.method != 'GET') {
      this.ngxUiLoaderService.start();
    }

    if (req.method == 'GET') {
      if (req.url.search(/22ab36428c4d1e11ecb55d0022480d6e6c/) != -1) {
        window.sessionStorage.setItem('appointment download status', 'downloading')
      } else if (req.url.search(/ab2959fa4d1e11ecb55d0022480d6e6c/) != -1) {
        window.sessionStorage.setItem('feedback download status', 'downloading')
      } else if (req.url.search(/ab2b1c724d1e11ecb55d0022480d6e6c/) != -1) {
        window.sessionStorage.setItem('live download status', 'downloading')
      } else if (req.url.search(/ab3829624d1e11ecb55d0022480d6e6c/) != -1) {
        window.sessionStorage.setItem('mile download status', 'downloading')
      } else if (req.url.search(/ab30258c4d1e11ecb55d0022480d6e6c/) != -1) {
        window.sessionStorage.setItem('conversion download status', 'downloading')
      }
      else if (req.url.search(/126e03b878e011f098600242ac110009/) != -1) {
        window.sessionStorage.setItem('remainder download status', 'downloading')
      }
    }


    let token = '';

    if (reqBody && reqBody.headers !== undefined) {
      token = reqBody.headers;
    } else if (reqBody || req.method == 'GET') {
      token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
    }


    let uri = environment.host + environment.appiyoDrive;
    if ((!req.headers.has('Content-Type') && req.url !== uri) || req.method == 'GET') {
      if (httpMethod == 'POST' || httpMethod == 'PUT') {
        if (req.url.includes('appiyo')) {
          if (environment.encryptionType == true) {
            const encryption = this.encrytionService.encrypt(
              JSON.stringify(req.body),

              environment.aesPublicKey,


            );
            console.log('req.body', req.body),
              req = req.clone({
                setHeaders: encryption.headers,
                body: encryption.rawPayload,
                responseType: 'text',
              });
              console.log('re*******************', req);                                    
          }
        }
      } else {
        if (req.method != 'GET') {
          req = req.clone({
            setHeaders: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'authentication-token': localStorage.getItem('token')
                ? localStorage.getItem('token')
                : '',
            },
          });
        } else {
          req = req.clone({
            setHeaders: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              'authentication-token': localStorage.getItem('token')
                ? localStorage.getItem('token')
                : '',
            },
          });
        }


      }
    }

    let authReq;
    if (req.url.includes('appiyo')) {
      authReq = req.clone({
        headers: req.headers.set(
          'authentication-token',
          localStorage.getItem('token')
            ? localStorage.getItem('token') : ''
        ),
        //     .set('X-AUTH-SESSIONID',
        //      localStorage.getItem('X-AUTH-SESSIONID') ?
        //      localStorage.getItem('X-AUTH-SESSIONID').trim() : '')
      });
    } else {
      authReq = req;
    }
    // if(req.method != 'GET') {
    return next.handle(authReq).pipe(

      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {

          if (err.status != 200) {
            this.ngxUiLoaderService.stop();
            if (err.status != 401 && err.status != 500) {
              if (err.status === 0) {
                // this.toasterService.showError(`${err.status}: Connection not available! Please try again later.`, 'Technical error..');
              } else {
                // this.toasterService.error(`${err.status}: ${err.statusText}`, 'Technical error..');
              }
            }
          }
        }
        return throwError(err);
      }),
      map(

        (event: HttpEvent<any>) => {


          let res;
          const sesstionSubcribe: Subscription = this.utilityService.sessionTimeOut$.subscribe(data => this.sessionTimeoutCount = data);
          this.apiCount--;
          if (event instanceof HttpResponse) {
            if (event.url?.search(/22ab36428c4d1e11ecb55d0022480d6e6c/) != -1) {
              window.sessionStorage.removeItem('appointment download status')
              // this.snackBar.open('Metrics Page Download completed', '', {
              //   duration: 5000
              // });
            } else if (event.url?.search(/ab2959fa4d1e11ecb55d0022480d6e6c/) != -1) {
              window.sessionStorage.removeItem('feedback download status')
            } else if (event.url?.search(/ab2b1c724d1e11ecb55d0022480d6e6c/) != -1) {
              window.sessionStorage.removeItem('live download status')
            } else if (event.url?.search(/ab3829624d1e11ecb55d0022480d6e6c/) != -1) {
              window.sessionStorage.removeItem('mile download status')
            } else if (event.url?.search(/ab30258c4d1e11ecb55d0022480d6e6c/) != -1) {
              window.sessionStorage.removeItem('conversion download status')
            }
            else if (event.url?.search(/126e03b878e011f098600242ac110009/) != -1) {
              window.sessionStorage.removeItem('remainder download status')
            }
            if (event.headers.get('content-type') == 'text/plain') {
              event = event.clone({
                body: JSON.parse(this.encrytionService.decryptResponse(event)),
              });
              res = event.body;
            } else {
              if (
                event.headers.get('content-type') != 'text/plain' &&
                event.headers.get('content-type') != "text/html" &&
                typeof event.body != 'object'
              ) {
                res = req.method != 'GET' ? JSON.parse(event.body) : res;
              }
              if (res && res['login_required']) {
                if (this.sessionTimeoutCount === 0) {
                  this.toasterService.showError('Session Expired.Please Login Again', '');
                  this.sessionTimeoutCount++;
                  this.utilityService.setSessionTimeOut(this.sessionTimeoutCount);
                }
                sesstionSubcribe.unsubscribe();
                this.utilityService.logOut();
                // this.utilityService.removeAllLocalStorage();
              }
            }

            if (res && res['Error'] === '1') {
              alert(res['ErrorMessage']);
            }
            // this.ngxUiLoaderService.stop();
            this.checkApiCount();
            return event;
          } else {
            // this.ngxUiLoaderService.stop();

            console.log('authenticateErrorevent', event);
          }
        },
        (err: any) => {
          console.log('authenticateError', err);
          this.checkApiCount();
        }
      )

    );
    // }



  }

  checkApiCount() {
    if (this.apiCount <= 0) {
      this.ngxUiLoaderService.stop();
    }
  }
}

