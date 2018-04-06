import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Author } from '../../../core/model/author';


@Injectable()
export class AuthorService {
  private _baseUrl = 'http://localhost:3000/';
  constructor(private http: Http) { }

  loadAllAuthors(): Observable<Array<Author>> {
    return this.http.get(this._baseUrl + 'authors').map(res => res.json());
  }
}
