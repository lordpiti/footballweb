import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Team } from '../common/interfaces/team.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class CompetitionService {

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
    this._apiUrl = environment.api_url;
  }

  getAllCompetitions() {
    var url = this._apiUrl+"competition";

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

}