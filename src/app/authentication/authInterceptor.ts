import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor() {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // Get the auth header from your auth service.
       const authReq = req.clone({headers: this.appendTokenNew()});
       return next.handle(authReq);
   }

   private appendTokenNew(): HttpHeaders {
    const token = localStorage.getItem('token');
    const authenticationType = localStorage.getItem('authenticationType');

    const tokenAndType = {
      token: token,
      authenticationType: authenticationType
    };

    const tokenAndTypeJSON = JSON.stringify(tokenAndType);

    const headers = token ? new HttpHeaders({
        'Content-Type': 'application/json',
        'authenticationToken': tokenAndTypeJSON
      }) :
      new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return headers;
    }
}
