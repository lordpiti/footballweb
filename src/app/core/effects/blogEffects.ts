import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, filter, catchError, mergeMap, switchMap, combineLatest } from 'rxjs/operators';





import { BlogActions } from '../actions/blogAction';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { BlogService } from '../../team/blog-test/services/blog.service';

@Injectable()
export class BlogEffects {

    @Effect()
    loadBlogs$: Observable<Action> = this.actions$
        .ofType('REQUEST_BLOGS')
        .pipe(
        switchMap(action => this.blogService.loadBlogs(action.payload)),
        map((blogs: any) => this.blogActions.loadBlogsSuccess(blogs)
        ));

    @Effect() addBlog$ = this.actions$
        .ofType('ADD_BLOG')
        .pipe(
        map(action => action.payload),
        switchMap(blog => this.blogService.addBlog(blog)),
        map(blog => this.blogActions.addBlogSuccess(blog)));


    @Effect() deleteBlog$ = this.actions$
        .ofType('DELETE_BLOG')
        .pipe(
        map(action => action.payload),
        switchMap(blog => this.blogService.deleteBlog(blog)),
        map(blog => this.blogActions.deleteBlogSuccess(blog)));

    constructor(
        private actions$: Actions<ActionWithPayload<any>>,
        private blogService: BlogService,
        private blogActions: BlogActions
    ) { }
}
