import { Component, OnInit } from "@angular/core";
import { TeamService } from "../team.service";
import { Player } from "../../shared/interfaces/player.interface";
import { Team } from "../../shared/interfaces/team.interface";
import { ShareDataService } from "../../shared/services/shared-data.service";
import { AppAreas } from "../../shared/enums/app-areas";
import { Observable } from "rxjs";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  public teamList$: Observable<Array<Team>>;

  public selectedTeamId: number;

  constructor(
    private _teamService: TeamService,
    private sharedService: ShareDataService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Teams);
    }, 0);
    this.teamList$ = this._teamService.getTeams(null);
  }

  public setSelectedTeamId(id: number) {
    this.selectedTeamId = id;
  }
}
