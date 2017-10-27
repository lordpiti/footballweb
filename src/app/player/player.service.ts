import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayerService {

  private _apiUrl: string;
  private _requestOptions: RequestOptions;
  
  constructor(public http: Http) {
    let myHeaders: Headers = new Headers();
    myHeaders.append('Accept', 'q=0.8;application/json;q=0.9'); //This was needed for firefox, because apparently it doesn't add the "Accept application/json" header automatically
    myHeaders.set('Content-Type', 'application/json');
    // myHeaders.set('authenticationToken', this.Token);
    this._requestOptions = new RequestOptions({
        headers: myHeaders
    });
    this._apiUrl = environment.api_url;//"http://localhost:57543/api/";
  }

  getPlayers() {
    var url = this._apiUrl+"player/";

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json().sort(function(a, b) {
          var nameA = a.surname.toUpperCase(); // ignore upper and lowercase
          var nameB = b.surname.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        }));
  }

}
