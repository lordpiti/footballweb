import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GooglemapsService {
  private _apiUrl: string;
  private _requestOptions: RequestOptions;

  constructor(public http: HttpClient) {
    this._apiUrl =
      'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAG7ddPMubaOTHEZTqB0s4ZV4830cIJyCU&';
  }

  getData(address: string) {
    const url = this._apiUrl + 'address=' + address;

    return this.http.get(url);
  }
}
