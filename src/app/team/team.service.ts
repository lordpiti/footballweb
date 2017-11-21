import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService extends BaseService {
  
  constructor(public http: Http, public sharedService: ShareDataService) {
    super(http, sharedService);
  }

  getTeams(competitionId: number) {
    var url = "team/teams/"+(competitionId?competitionId:'') ;

    return this.get(url);
  }

  getTeamDetails(id: number) {
    var url = "team/teams/"+id+"/year/2009";
    
    return this.get(url);
  }

  getTeamCompetitions(id: number) {
    var url = "competition/team/"+id;
    
    return this.get(url);
  }

  saveTeamDetails(teamDetails: Team) {
    var url = this._apiUrl+"team/saveTeamDetails";
    
    return this.http.post(url, teamDetails, this._requestOptions)
        .map((res: Response) => res.json());
  }

  addBase64Image(image: string, fileName: string) {
    var url = this._apiUrl+"GlobalMedia/UploadBase64Image";
    
    return this.http.post(url, { Base64String:image, FileName: fileName }, this._requestOptions)
        .map((res: Response) => res.json());
  }

  getChartData(teamId: number, competitionName: string, season: string) {

    var url = "team/clasification/"+teamId+
    "/competition/"+competitionName+"/season/"+season;
    
    return this.get(url)
        .map((res: Response) => this.convertToChartData(res));
  }

  getClasificationData(competitionId: number, round: string) {
    var url = "team/clasification/"+competitionId+
    "/round/"+round;
    
    return this.get(url);
  }

  private convertToChartData(data: any):any {
    let positionList = [],
    goalsForList = [],
    goalsAgainstList = [],
    roundList= [];

    data.clasificationSeasonData.forEach(element => {
      positionList.push(element.position);
      goalsForList.push(element.goalsFor);
      goalsAgainstList.push(element.goalsAgainst);
      roundList.push(element.round);
    });

    let lineChartData = {
      positions: { label: 'Position', data: positionList },
      goalsForList: { label: 'Goals For', data: goalsForList },
      goalsAgainstList: { label: 'Goals Against', data: goalsAgainstList },
      roundList: roundList,
      teamName: data.teamName
    };

    return lineChartData;
  }

  public currentTeam: Team;
  private currentTeamSubject: Subject<Team> = new Subject<Team>();


  public setCurrentTeam(_data: Team) {
      this.currentTeam = _data;
      this.currentTeamSubject.next(_data)
  };
  public getCurrentTeam(): Observable<Team> {
      return this.currentTeamSubject.asObservable();
  };

}
