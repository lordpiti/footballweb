import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { BlobDataService } from './blob-data.service';

describe('BlobDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, BlobDataService],
    });
  });

  it('should be created', inject(
    [BlobDataService],
    (service: BlobDataService) => {
      expect(service).toBeTruthy();
    }
  ));
});
