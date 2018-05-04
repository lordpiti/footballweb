import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MatchEvent } from '../../../shared/interfaces/match-event.interface';
import { MatchEventTypes } from '../../../shared/enums/match-event-types';
import { Team } from '../../../shared/interfaces/team.interface';
import { CompetitionService } from '../../competition.service';
import { Observable } from 'rxjs/Rx';
import { Match } from '../../../shared/interfaces/match.interface';

@Component({
  selector: 'app-competition-simulation-match',
  templateUrl: './competition-simulation-match.component.html',
  styleUrls: ['./competition-simulation-match.component.scss']
})
export class CompetitionSimulationMatchComponent implements OnInit {

  @Input() match: Match;
  teamLocal: Observable<Team> = null;
  teamVisitor: Observable<Team> = null;
  public async: any;

  constructor(private _competitionService: CompetitionService) {

  }

  ngOnInit() {
    this.teamLocal = this._competitionService.getTeamDetails(this.match.local);
    this.teamVisitor = this._competitionService.getTeamDetails(this.match.visitor);
  }

}
