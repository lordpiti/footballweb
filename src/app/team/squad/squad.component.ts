import { Component, OnInit, Input } from '@angular/core';
import { TeamService} from '../team.service';
import { Store } from '@ngrx/store';
import { Team } from '../../shared/interfaces/team.interface';
import { Observable } from 'rxjs';
import { Player } from '../../shared/interfaces/player.interface';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {

  public today: Date = new Date();
  public players$: Observable<Player[]>;

  constructor(private store: Store<{ team:{
    current: Team,
    loadingSpinner: boolean
  }  }>,) {

  }

  ngOnInit() {
    this.players$ = this.store.select(x=>x.team.current.playerList);
  }

}
