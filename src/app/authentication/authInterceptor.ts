import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor() {
       console.log('constructor');
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log('hey');
       // Get the auth header from your auth service.
       const authReq = req.clone({headers: this.appendTokenNew()});
       return next.handle(authReq);
   }

   private appendTokenNew(): HttpHeaders {
    const token = localStorage.getItem('token');
    const authenticationType = localStorage.getItem('authenticationType');

    let tokenAndType = {
      token: token, 
      authenticationType: authenticationType
    }

    let tokenAndTypeJSON = JSON.stringify(tokenAndType);

    let headers = token? new HttpHeaders({ 
        'Content-Type': 'application/json',
        'authenticationToken': tokenAndTypeJSON
      }): 
      new HttpHeaders({ 
        'Content-Type': 'application/json'
      });
      console.log('bu');
      //headers.append('authenticationToken', tokenAndTypeJSON);
      return headers;
    }
}