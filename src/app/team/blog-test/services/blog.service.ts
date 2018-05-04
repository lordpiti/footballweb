
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { Blog } from '../../../core/model/blog';


@Injectable()
export class BlogService {
  private _baseUrl = 'http://localhost:3000/';
  constructor(private http: Http) { }

  loadBlogs(filter1): Observable<Blog[]> {
    if (!filter1 || filter1 === 'All') {
      return this.http.get(this._baseUrl + 'blogs')
      .pipe(map(res => res.json()));
    }
    return this.http.get(this._baseUrl + 'blogs?author=' + filter1)
    .pipe(map(res => res.json()));
  }

  addBlog(blog: Blog): Observable<Object> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._baseUrl + 'blogs', blog, options)
      .pipe(map((res) => res.json()),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  deleteBlog(blog: Blog): Observable<Object> {
    return this.http.delete(this._baseUrl + 'blogs' + '/' + blog.id)
      .pipe(map((res) => blog),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }


}
