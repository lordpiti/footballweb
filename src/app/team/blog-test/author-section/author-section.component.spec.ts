import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSectionComponent } from './author-section.component';

import { FormsModule } from '@angular/forms';
import {
  RouterTestingModule
} from '@angular/router/testing';

import { AuthorService } from '../services/author.service';
import { BlogService } from '../services/blog.service';
import { BlogActions } from '../actions/blogAction';
import { HttpModule } from '@angular/http';
import { authorFilter } from '../reducers/authorFilter';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { blog } from '../reducers/blog';


describe('AuthorSectionComponent', () => {
  let component: AuthorSectionComponent;
  let fixture: ComponentFixture<AuthorSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterTestingModule.withRoutes([]),
        StoreModule.provideStore({ blog, authorFilter })],
      providers: [AuthorService, BlogService, BlogActions],
      declarations: [AuthorSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
