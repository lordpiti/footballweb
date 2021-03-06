import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Team } from '../../shared/interfaces/team.interface';
import { TeamActions } from '../../core/actions/teamAction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview-ngrx',
  templateUrl: './overview-ngrx.component.html',
  styleUrls: ['./overview-ngrx.component.scss']
})
export class OverviewNgrxComponent implements OnInit {

  public teams$: Observable<Team[]>;

  public textToSearch = '';

  opened: any;

  events = [];

  constructor(private store: Store<{ team: Team[] }>,
    private teamActions: TeamActions) { }

  ngOnInit() {

    this.teams$ = this.store.select(x => x.team);

    this.loadTeams();
  }

  loadTeams() {
    this.store.dispatch(this.teamActions.loadTeams(1));
  }

  onSearchChange(searchString: string) {
    this.store.dispatch(this.teamActions.searchTeams(searchString));
    console.log(searchString);
  }
}
