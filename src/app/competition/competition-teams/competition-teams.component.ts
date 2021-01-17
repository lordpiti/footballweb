import { Component, OnInit } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { CompetitionService } from '../competition.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-competition-teams',
  templateUrl: './competition-teams.component.html',
  styleUrls: ['./competition-teams.component.scss'],
})
export class CompetitionTeamsComponent implements OnInit {
  public teamList$: Observable<any>;
  private competitionData: any;
  public selectedTeamId: number;

  public setSelectedTeam(teamId: number) {
    this.selectedTeamId = teamId;
  }

  constructor(private _competitionService: CompetitionService) {}

  ngOnInit() {
    this._competitionService.getCurrentCompetition().subscribe((data) => {
      this.competitionData = data;
      this.teamList$ = this._competitionService.getTeams(
        this.competitionData.id
      );
    });
  }
}
