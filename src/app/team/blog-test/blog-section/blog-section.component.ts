import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { map, filter, catchError, mergeMap, switchMap, combineLatest } from 'rxjs/operators';
import { BlogActions } from '../../../core/actions/blogAction';
import { Blog } from '../../../core/model/blog';


@Component({
  selector: 'blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogSectionComponent implements OnInit {
  @Input()
  filter = 'All';

  blogs$: Observable<Blog[]>;

  constructor(private store: Store<{ blog: Blog, authorFilter }>,
    private blogActions: BlogActions) {

  }

  ngOnInit() {
    combineLatest(
      this.store.select(x => x.blog),
      this.store.select(x => x.authorFilter),
      (blogs: any, authorFilter: any) => {
        // console.log(blogs.data);
        this.blogs$ = blogs.data ? blogs.data.filter(authorFilter) : [];
      }
    );

    this.loadBlogs();
  }

  loadBlogs() {
    this.store.dispatch(this.blogActions.loadBlogs('All'));
  }

  addBlog(blog: Blog) {
    blog.author = this.filter;
    this.store.dispatch({ type: 'ADD_BLOG', payload: blog });
  }

  deleteBlog(blog: Blog) {
    this.store.dispatch({ type: 'DELETE_BLOG', payload: blog });
  }


}
