import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { ShareDataService } from './shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  protected _apiUrl: string;
  protected _requestOptions: RequestOptions;
  protected _headers: HttpHeaders;
  
  constructor(public http: Http, public shareDataService: ShareDataService, public httpNew:HttpClient) {
    this._apiUrl = environment.api_url;
    this._headers = this.appendTokenNew();
  }

  public get(url: string) {
    const headers = new Headers();
    const options = new RequestOptions({ headers: this.appendToken(headers) });
    return this.http.get(this._apiUrl + url, options)
      .map((response: Response) => response.json());
  }

  public post(url: string, data: any) {
    const headers = new Headers();
    const options = new RequestOptions({ headers: this.appendToken(headers) });
    return this.http.post(this._apiUrl + url, data, options)
      .map((response: Response) => response.json());
  }

  private appendToken(headers: Headers): Headers {
    const token = localStorage.getItem('token');
    const authenticationType = localStorage.getItem('authenticationType');

    let tokenAndType = {
      token: token, 
      authenticationType: authenticationType
    }

    let tokenAndTypeJSON = JSON.stringify(tokenAndType);
    if (token) {
      headers.append('authenticationToken', tokenAndTypeJSON);
    }
    return headers;
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

  // public setAuthenticationToken(_data: string) {
  //   this._requestOptions.headers.set('authenticationToken', _data);
  // };

}