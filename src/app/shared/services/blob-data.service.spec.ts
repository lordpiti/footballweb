import { TestBed, inject } from '@angular/core/testing';

import { BlobDataService } from './blob-data.service';

describe('BlobDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlobDataService]
    });
  });

  it('should be created', inject([BlobDataService], (service: BlobDataService) => {
    expect(service).toBeTruthy();
  }));
});
