import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseService {

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  getAllUsers() {
    const url = 'user';

    return this.get<any>(url);
  }

  loginUserFacebook(userId: string, accessToken: string): Observable<any> {
    const url = 'user/Login';

    return this.post<any>(url, { userId: userId, accessToken: accessToken });
  }

  loginUserGoogle(accessToken: string): Observable<any> {
    const url = 'user/LoginGoogle';

    return this.post<any>(url, { userId: '', accessToken: accessToken });
  }
}
