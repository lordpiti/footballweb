import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionWithPayload } from './actionWithPayload';
@Injectable()
export class BlogActions {
    static REQUEST_BLOGS = 'REQUEST_BLOGS';
    static LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';
    static ADD_BLOG_SUCCESS = 'ADD_BLOG_SUCCESS';
    static DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';

    loadBlogs(filter): ActionWithPayload<any> {
        return {
            type: BlogActions.REQUEST_BLOGS,
            payload: filter
        };
    }

    loadBlogsSuccess(blogs):  ActionWithPayload<any> {
        return {
            type: BlogActions.LOAD_BLOGS_SUCCESS,
            payload: blogs
        };
    }

    addBlogSuccess(blog): ActionWithPayload<any> {
        return {
            type: BlogActions.ADD_BLOG_SUCCESS,
            payload: blog
        };
    }

    deleteBlogSuccess(blog): ActionWithPayload<any> {
        return {
            type: BlogActions.DELETE_BLOG_SUCCESS,
            payload: blog
        };
    }

}