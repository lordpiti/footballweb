import { Injectable } from '@angular/core';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TeamService extends BaseService {

  public currentTeam: Team;
  private currentTeamSubject: Subject<Team> = new Subject<Team>();

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  getTeams(competitionId: number) {
    const url = 'team/teams/' + (competitionId ? competitionId : '');

    return this.get<Team[]>(url);
  }

  getTeamDetails(id: number) {
    const url = 'team/teams/' + id + '/year/2009';

    return this.get<Team>(url);
  }

  getTeamCompetitions(id: number) {
    const url = 'competition/team/' + id;

    return this.get<any>(url);
  }

  saveTeamDetails(teamDetails: Team) {
    const url = 'team/saveTeamDetails';

    return this.post<any>(url, teamDetails);
  }

  addBase64Image(image: string, fileName: string) {
    const url = 'GlobalMedia/UploadBase64Image';

    return this.post<any>(url, { Base64String: image, FileName: fileName });
  }

  getChartData(teamId: number, competitionName: string, season: string) {

    const url = 'team/clasification/' + teamId +
    '/competition/' + competitionName + '/season/' + season;

    return this.get<any>(url)
    .map(res => this.convertToChartData(res));
  }

  getClasificationData(competitionId: number, round: string) {
    const url = 'team/clasification/' + competitionId +
    '/round/' + round;

    return this.get<any>(url);
  }

  private convertToChartData(data: any): any {
    const positionList = [],
    goalsForList = [],
    goalsAgainstList = [],
    roundList = [];

    data.clasificationSeasonData.forEach(element => {
      positionList.push(element.position);
      goalsForList.push(element.goalsFor);
      goalsAgainstList.push(element.goalsAgainst);
      roundList.push(element.round);
    });

    const lineChartData = {
      positions: { label: 'Position', data: positionList },
      goalsForList: { label: 'Goals For', data: goalsForList },
      goalsAgainstList: { label: 'Goals Against', data: goalsAgainstList },
      roundList: roundList,
      teamName: data.teamName
    };

    return lineChartData;
  }

  public setCurrentTeam(_data: Team) {
      this.currentTeam = _data;
      this.currentTeamSubject.next(_data);
  }

  public getCurrentTeam(): Observable<Team> {
      return this.currentTeamSubject.asObservable();
  }

}
