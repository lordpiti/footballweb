import { TestBed } from '@angular/core/testing';

import { RssReaderService } from './rss-reader.service';

describe('RssReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RssReaderService = TestBed.get(RssReaderService);
    expect(service).toBeTruthy();
  });
});
