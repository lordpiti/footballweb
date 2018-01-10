import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { ShareDataService } from '../shared/services/shared-data.service';
import { BaseService } from '../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService extends BaseService {
  
  constructor(public http: Http, public sharedService: ShareDataService, public httpNew:HttpClient) {
    super(http, sharedService, httpNew);
  }

  getAllUsers() {
    var url = this._apiUrl+"user";

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  loginUserFacebook(userId: string, accessToken: string) {
    var url = this._apiUrl+"user/Login";

    return this.http.post(url, { userId: userId, accessToken: accessToken }, this._requestOptions)
        .map((res: Response) => res.json());
  }

  loginUserGoogle(accessToken: string) {
    var url = this._apiUrl+"user/LoginGoogle";

    return this.http.post(url, { userId: '', accessToken: accessToken }, this._requestOptions)
        .map((res: Response) => res.json());
  }
}
