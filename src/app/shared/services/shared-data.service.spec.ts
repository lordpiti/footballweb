import { TestBed, inject } from '@angular/core/testing';

import { ShareDataService } from './shared-data.service';

describe('SharedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareDataService]
    });
  });

  it('should be created', inject([ShareDataService], (service: ShareDataService) => {
    expect(service).toBeTruthy();
  }));
});
