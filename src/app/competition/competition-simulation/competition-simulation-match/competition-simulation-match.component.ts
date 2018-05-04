import { Component, OnInit, Input } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
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
  goalsLocal: number;
  goalsVisitor: number;
  teamLocal: Observable<Team> = null;
  teamVisitor: Observable<Team> = null;
  private _hubConnection: HubConnection;
  public async: any;

  constructor(private _competitionService: CompetitionService) {
    this.goalsLocal = 0;
    this.goalsVisitor = 0;
  }

  ngOnInit() {
    this.teamLocal = this._competitionService.getTeamDetails(this.match.local);
    this.teamVisitor = this._competitionService.getTeamDetails(this.match.visitor);

    this._hubConnection = new HubConnection(environment.hubUrl + '/loopy');

    this._hubConnection.on('Send', (data: MatchEvent) => {
      if (data.matchId === this.match.id) {
        this.match.matchEvents.push(data);

        switch (data.matchEventType) {
            case MatchEventTypes.GameFinished:
                this.match.finished = true;
                break;
            case MatchEventTypes.Goal:
                if (this.match.local === data.team1.id) {
                  this.goalsLocal++;
                } else {
                  this.goalsVisitor++;
                }
                break;
            default:
                break;
        }
      }

    });

    this._hubConnection.start()
    .then(() => {
        console.log('Hub connection started');
    })
    .catch(err => {
        console.log('Error while establishing connection');
    });
  }

}
