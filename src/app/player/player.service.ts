import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';

@Injectable()
export class PlayerService extends BaseService {

  
  constructor(public http: Http, public sharedService: ShareDataService) {
    super(http, sharedService);
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
