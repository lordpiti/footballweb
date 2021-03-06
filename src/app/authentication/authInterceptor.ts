import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor() {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // Get the auth header from your auth service.
       const authReq = req.clone({headers: this.appendToken()});
       return next.handle(authReq);
   }

   private appendToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    const authenticationType = localStorage.getItem('authenticationType');

    const tokenAndType = {
      token: token,
      authenticationType: authenticationType
    };

    const tokenAndTypeJSON = JSON.stringify(tokenAndType);

    const headers = token ? new HttpHeaders({
        'authenticationToken': tokenAndTypeJSON
      }) :
      new HttpHeaders({
      });

      return headers;
    }
}
