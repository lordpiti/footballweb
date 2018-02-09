import { Injectable } from '@angular/core';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TeamService extends BaseService {

  public currentTeam: Team;
  private currentTeamSubject: Subject<Team> = new Subject<Team>();

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  getTeams(competitionId: number) {
    const url = this._apiUrl + 'team/teams/' + (competitionId ? competitionId : '');

    return this.httpNew.get<Team[]>(url, { headers: this._headers });
  }

  getTeamDetails(id: number) {
    const url = this._apiUrl + 'team/teams/' + id + '/year/2009';

    return this.httpNew.get<Team>(url, { headers: this._headers });
  }

  getTeamCompetitions(id: number) {
    const url = this._apiUrl + 'competition/team/' + id;

    return this.httpNew.get(url, { headers: this._headers });
  }

  saveTeamDetails(teamDetails: Team) {
    const url = this._apiUrl + 'team/saveTeamDetails';

    return this.httpNew.post(url, teamDetails, { headers: this._headers });
  }

  addBase64Image(image: string, fileName: string) {
    const url = this._apiUrl + 'GlobalMedia/UploadBase64Image';

    return this.httpNew.post(url, { Base64String: image, FileName: fileName }, { headers: this._headers });
  }

  getChartData(teamId: number, competitionName: string, season: string) {

    const url = this._apiUrl + 'team/clasification/' + teamId +
    '/competition/' + competitionName + '/season/' + season;

    return this.httpNew.get(url, { headers: this._headers })
    .map(res => this.convertToChartData(res));
  }

  getClasificationData(competitionId: number, round: string) {
    const url = this._apiUrl + 'team/clasification/' + competitionId +
    '/round/' + round;

    return this.httpNew.get(url, { headers: this._headers });
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
