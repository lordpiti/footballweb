import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseService {

  protected _apiUrl: string;

  constructor(public httpNew: HttpClient) {
    this._apiUrl = environment.api_url;
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.httpNew.post<T>(this._apiUrl + url, data);
  }

  public get<T>(url: string): Observable<T> {
    return this.httpNew.get<T>(this._apiUrl + url);
  }
}
