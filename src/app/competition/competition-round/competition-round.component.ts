import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-competition-round',
  templateUrl: './competition-round.component.html',
  styleUrls: ['./competition-round.component.scss']
})
export class CompetitionRoundComponent implements OnInit {


  private competitionData: any;
  public roundData: any;
  public roundId: string;
  
  constructor(private _competitionService: CompetitionService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.roundId = params['id'];
    });

    if (this._competitionService.currentCompetition){
      this.competitionData = this._competitionService.currentCompetition;
      this.loadRound(this.roundId);
    }
    
    this._competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionData = data;
      this.loadRound(this.roundId);
    });

  }

  private loadRound(roundId: string){
    if (!roundId){
      roundId = "1";
    }
    this._competitionService.getCompetitionRoundGames(this.competitionData.id, roundId).subscribe(
      (data: any) => {
          this.roundData = data;
      },
      (err: any) => {
      }
    );
    
  }
}
