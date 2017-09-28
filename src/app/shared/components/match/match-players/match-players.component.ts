import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../../interfaces/player.interface';
import { Team } from '../../../interfaces/team.interface';

@Component({
  selector: 'app-match-players',
  templateUrl: './match-players.component.html',
  styleUrls: ['./match-players.component.scss']
})
export class MatchPlayersComponent implements OnInit {

  @Input() players: Array<Player>;
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
