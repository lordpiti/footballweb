import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { PlayerService } from './player.service';
import { Player } from '../shared/interfaces/player.interface';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, HttpClient, PlayerService]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {

    const response: Array<Player> = [
      {
        name: 'jaja',
        surname: 'zeta',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker'
      },
      {
        name: 'jaja',
        surname: 'alfa',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker' },
    ];

    const expected: Array<Player> = [
      {
        name: 'jaja',
        surname: 'alfa',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker'
      },
      {
        name: 'jaja',
        surname: 'zeta',
        teamName: '',
        dorsal: 2,
        teamId: 2,
        playerId: 4,
        position: 'Striker' },
    ];

    const test = Observable.of(new Object()).mapTo(response);
    spyOn(service, 'get').and.returnValue(test);

    service.getPlayers().subscribe(data => {
      expect(data).toEqual(expected);
    });
  }));
});
