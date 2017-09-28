import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
