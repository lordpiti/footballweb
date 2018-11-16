import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map, filter, catchError, mergeMap, switchMap, combineLatest } from 'rxjs/operators';

@Injectable()
export class GooglemapsService {

  private _apiUrl: string;
  private _requestOptions: RequestOptions;

  constructor(public http: Http) {
    const myHeaders: Headers = new Headers();

    this._requestOptions = new RequestOptions({
        headers: myHeaders
    });
    this._apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAG7ddPMubaOTHEZTqB0s4ZV4830cIJyCU&';
  }

  getData(address: string) {
    const url = this._apiUrl + 'address=' + address;

    return this.http.get(url, this._requestOptions)
    .pipe(
        map((res: Response) => res.json()));
  }
}
