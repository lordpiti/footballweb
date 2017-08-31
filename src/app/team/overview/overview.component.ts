import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Player } from '../../common/interfaces/player.interface';
import { Team } from '../../common/interfaces/team.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

public teamList: Array<Team>;

  constructor(private _teamService : TeamService) { }

  ngOnInit() {
    this._teamService.getAllTeams().subscribe(
      (data: Array<Team>) => {
          this.teamList = data;
          console.log(data);
          //this.surveyService.setProjectFollowerData(data);
      },
      (err: any) => {
      }
  );
  }

}
