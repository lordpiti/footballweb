import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-player-statistics',
  templateUrl: './match-player-statistics.component.html',
  styleUrls: ['./match-player-statistics.component.scss']
})
export class MatchPlayerStatisticsComponent implements OnInit {

  @Input() matchId: number;
  @Input() playerId: number;
  public matchPlayerStatistics : any;

  constructor(private _matchService: MatchService) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(changes:any){
    this.getData();
  }

  private getData(){
    if (this.matchId && this.playerId){
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
