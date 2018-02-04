import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ShareDataService } from '../shared/services/shared-data.service';
import { BaseService } from '../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseService {
  
  constructor(public sharedService: ShareDataService, public httpNew:HttpClient) {
    super(sharedService, httpNew);
  }

  getAllUsers() {
    var url = this._apiUrl+"user";

    return this.httpNew.get(url, { headers: this._headers });
  }

  loginUserFacebook(userId: string, accessToken: string):Observable<any> {
    var url = this._apiUrl+"user/Login";

    return this.httpNew.post(url, { userId: userId, accessToken: accessToken }, { headers: this._headers });
  }

  loginUserGoogle(accessToken: string):Observable<any> {
    var url = this._apiUrl+"user/LoginGoogle";

    return this.httpNew.post(url, { userId: '', accessToken: accessToken }, { headers: this._headers });
  }
}
