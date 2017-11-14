import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { ShareDataService } from './shared-data.service';

@Injectable()
export class BaseService {

  protected _apiUrl: string;
  protected _requestOptions: RequestOptions;
  
  constructor(public http: Http, public shareDataService: ShareDataService) {
    this._apiUrl = environment.api_url;
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
    const token = this.shareDataService.authenticationToken;
    if (token) {
      headers.append('authenticationToken', token);
    }
    return headers;
  }

  // public setAuthenticationToken(_data: string) {
  //   this._requestOptions.headers.set('authenticationToken', _data);
  // };

}