import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { CompetitionService } from './competition.service';

describe('CompetitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, CompetitionService],
    });
  });

  it('should be created', inject(
    [CompetitionService],
    (service: CompetitionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
