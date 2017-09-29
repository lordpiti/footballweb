import { Component, OnInit } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-competition-teams',
  templateUrl: './competition-teams.component.html',
  styleUrls: ['./competition-teams.component.scss']
})
export class CompetitionTeamsComponent implements OnInit {
 i
  public teamList:any;
  private competitionData: any;

  constructor(private _competitionService: CompetitionService) { }

  ngOnInit() {

    if (this._competitionService.currentCompetition){
      this.competitionData = this._competitionService.currentCompetition;
      this.loadTeams();
    }
    
    this._competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionData = data;
      this.loadTeams();
    });

  }

  private loadTeams(){
    this._competitionService.getTeams(this.competitionData.id).subscribe(
      (data: Array<Team>) => {
          this.teamList = data;
      },
      (err: any) => {
      }
    );
  }

}
