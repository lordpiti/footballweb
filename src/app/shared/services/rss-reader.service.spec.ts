import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { RssReaderService } from './rss-reader.service';

describe('RssReaderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, RssReaderService],
    })
  );

  it('should be created', inject(
    [RssReaderService],
    (service: RssReaderService) => {
      expect(service).toBeTruthy();
    }
  ));
});
