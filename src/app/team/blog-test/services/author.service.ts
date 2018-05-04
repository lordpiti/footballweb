import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author } from '../../../core/model/author';


@Injectable()
export class AuthorService {
  private _baseUrl = 'http://localhost:3000/';
  constructor(private http: Http) { }

  loadAllAuthors(): Observable<Array<Author>> {
    return this.http.get(this._baseUrl + 'authors').pipe(map(res => res.json()));
  }
}
