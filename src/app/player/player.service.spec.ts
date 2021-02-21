import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { PlayerService } from './player.service';
import { Player } from '../shared/interfaces/player.interface';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, HttpClient, PlayerService],
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    const mockDate = new Date();
    const response: Array<Player> = [
      {
        name: 'jaja',
        surname: 'zeta',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker',
        birthDate: mockDate,
        birthPlace: '',
        height: 2,
        picture: null,
      },
      {
        name: 'jaja',
        surname: 'alfa',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker',
        birthDate: mockDate,
        birthPlace: '',
        height: 2,
        picture: null,
      },
    ];

    const expected: Array<Player> = [
      {
        name: 'jaja',
        surname: 'alfa',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker',
        birthDate: mockDate,
        birthPlace: '',
        height: 2,
        picture: null,
      },
      {
        name: 'jaja',
        surname: 'zeta',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker',
        birthDate: mockDate,
        birthPlace: '',
        height: 2,
        picture: null,
      },
    ];

    const test = Observable.of(new Object()).mapTo(response);
    spyOn(service, 'get').and.returnValue(test);

    service.getPlayers().subscribe((data) => {
      expect(data).toEqual(expected);
    });
  }));
});
