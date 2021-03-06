import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { MatchPlayedStatistics } from '../../interfaces/match-played-statistics.interface';

@Component({
  selector: 'app-match-player-statistics',
  templateUrl: './match-player-statistics.component.html',
  styleUrls: ['./match-player-statistics.component.scss']
})
export class MatchPlayerStatisticsComponent implements OnInit, OnChanges {

  @Input() matchId: number;
  @Input() playerId: number;
  public matchPlayerStatistics: MatchPlayedStatistics;

  constructor(private _matchService: MatchService) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(changes: any) {
    this.getData();
  }

  private getData() {
    if (this.matchId && this.playerId) {
      this._matchService.getMatchPlayerStatistics(this.playerId, this.matchId).subscribe(
        (matchData: any) => {
            this.matchPlayerStatistics = matchData;
        },
        (err: any) => {
        }
      );
    }
  }
}
