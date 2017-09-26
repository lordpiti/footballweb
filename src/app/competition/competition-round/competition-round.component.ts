import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-competition-round',
  templateUrl: './competition-round.component.html',
  styleUrls: ['./competition-round.component.scss']
})
export class CompetitionRoundComponent implements OnInit {


  private competitionId: number;
  public roundData: any;
  
  constructor(private _competitionService: CompetitionService) { }

  ngOnInit() {
    
    if (this._competitionService.currentCompetition){
      this.competitionId = this._competitionService.currentCompetition;
      this.loadRound();
    }
    
    this._competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionId = data;
      this.loadRound();
    });

  }

  private loadRound(){
    this._competitionService.getCompetitionRoundGames(this.competitionId, "1").subscribe(
      (data: any) => {
          this.roundData = data;
      },
      (err: any) => {
      }
    );
  }

}
