import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

private _teamList: any;

  constructor(private _teamService : TeamService) { }

  ngOnInit() {
    this._teamService.getAllTeams().subscribe(
      (data: any) => {
          this._teamList = data;
          console.log(data);
          //this.surveyService.setProjectFollowerData(data);
      },
      (err: any) => {
      }
  );
  }

}
