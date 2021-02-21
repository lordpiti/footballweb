import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { GooglemapsService } from './googlemaps.service';

describe('GooglemapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, GooglemapsService],
    });
  });

  it('should be created', inject(
    [GooglemapsService],
    (service: GooglemapsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
