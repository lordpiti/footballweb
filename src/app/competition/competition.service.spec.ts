import { TestBed, inject } from '@angular/core/testing';

import { CompetitionService } from './competition.service';

describe('CompetitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompetitionService]
    });
  });

  it('should be created', inject([CompetitionService], (service: CompetitionService) => {
    expect(service).toBeTruthy();
  }));
});
