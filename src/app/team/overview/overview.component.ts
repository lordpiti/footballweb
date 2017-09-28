import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Player } from '../../shared/interfaces/player.interface';
import { Team } from '../../shared/interfaces/team.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public teamList: Array<Team>;

  public selectedTeamId: number;

  constructor(private _teamService : TeamService) { 

  }

  ngOnInit() {
    this._teamService.getTeams(null).subscribe(
      (data: Array<Team>) => {
          this.teamList = data;
          //this.surveyService.setProjectFollowerData(data);
      },
      (err: any) => {
      }
    );
  }

  public setSelectedTeamId(id: number){
    this.selectedTeamId = id;
  }

}
