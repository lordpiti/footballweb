import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-competition-teams',
  templateUrl: './competition-teams.component.html',
  styleUrls: ['./competition-teams.component.scss']
})
export class CompetitionTeamsComponent implements OnInit {

  private teamList:any;
  private competitionId: number;

  constructor(private _competitionService: CompetitionService) { }

  ngOnInit() {

    if (this._competitionService.currentCompetition){
      this.competitionId = this._competitionService.currentCompetition;
      this.loadTeams();
    }
    
    this._competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionId = data;
      this.loadTeams();
    });

  }

  private loadTeams(){
    this._competitionService.getTeams(this.competitionId).subscribe(
      (data: Array<Team>) => {
          this.teamList = data;
      },
      (err: any) => {
      }
    );
  }

}
