import { TestBed, inject } from '@angular/core/testing';

import { GooglemapsService } from './googlemaps.service';

describe('GooglemapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglemapsService]
    });
  });

  it('should be created', inject([GooglemapsService], (service: GooglemapsService) => {
    expect(service).toBeTruthy();
  }));
});
