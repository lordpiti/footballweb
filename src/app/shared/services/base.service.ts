import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShareDataService } from './shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  protected _apiUrl: string;
  protected _headers: HttpHeaders;
  
  constructor(public shareDataService: ShareDataService, public httpNew:HttpClient) {
    this._apiUrl = environment.api_url;
    this._headers = this.appendTokenNew();
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