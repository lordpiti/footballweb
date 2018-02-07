import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {

  protected _apiUrl: string;
  protected _headers: HttpHeaders;
  
  constructor(public httpNew:HttpClient) {
    debugger;
    this._apiUrl = environment.api_url;
    this._headers = this.appendTokenNew();
  }

  public post<T>(url:string, data: any):Observable<T>{
    return this.httpNew.post<T>(this._apiUrl+url, data, { headers: this._headers });
  }

  public get<T>(url:string):Observable<T>{
    console.log(this._apiUrl);
    return this.httpNew.get<T>(this._apiUrl+url, { headers: this._headers });
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

      //headers.append('authenticationToken', tokenAndTypeJSON);
      return headers;
    }

}