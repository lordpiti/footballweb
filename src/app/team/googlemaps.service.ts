import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class GooglemapsService {

  private _apiUrl: string;
  private _requestOptions: RequestOptions;

  constructor(public http: Http) {
    const myHeaders: Headers = new Headers();

    this._requestOptions = new RequestOptions({
        headers: myHeaders
    });
    this._apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  }

  getData(address: string) {
    const url = this._apiUrl + 'address=' + address;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }
}
