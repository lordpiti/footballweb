import { Blog } from '../model/blog';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export function blog(state: any = [], action) {
    switch (action.type) {
        case 'ADD_BLOG_SUCCESS': {
            return { data: [...state.data, action.payload] };
        }
        case 'LOAD_BLOGS_SUCCESS': {
            return { ...state, data: action.payload };
        }
        case 'DELETE_BLOG_SUCCESS': {
            return {
                data: state.data.filter((blogItem: Blog) => {
                    return blogItem.id !== action.payload.id;
                })
            };
        }
        default: {
            return state;
        }
    }
}

export const getBlog = createFeatureSelector<Blog>('blog');

export const getBlogs = createSelector(
  getBlog,
  (state: Blog) => state
);
