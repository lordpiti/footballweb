import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RssReaderService } from '../../services/rss-reader.service';

import { RssReaderComponent } from './rss-reader.component';

describe('RssReaderComponent', () => {
  let component: RssReaderComponent;
  let fixture: ComponentFixture<RssReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RssReaderComponent],
      providers: [HttpClient, HttpHandler, RssReaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
