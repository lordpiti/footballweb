import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-competition-round',
  templateUrl: './competition-round.component.html',
  styleUrls: ['./competition-round.component.scss'],
})
export class CompetitionRoundComponent implements OnInit {
  public roundData$: Observable<any>;
  public roundId: string;
  @Input() competitionData: any;

  constructor(private _competitionService: CompetitionService) {}

  ngOnInit() {
    this.roundId = '1';

    this.loadRound(this.roundId);
  }

  private loadRound(roundId: string) {
    if (!roundId) {
      roundId = '1';
      this.roundId = roundId;
    }
    this.roundData$ = this._competitionService.getCompetitionRoundGames(
      this.competitionData.id,
      roundId
    );
  }

  public changeSelectedRound(event: Event) {
    this.loadRound(this.roundId);
  }
}
