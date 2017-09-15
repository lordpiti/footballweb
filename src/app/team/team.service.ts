import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Team } from '../common/interfaces/team.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {

  private _apiUrl: string;
  private _requestOptions: RequestOptions;
  
  constructor(public http: Http) {
    let myHeaders: Headers = new Headers();
    myHeaders.append('Accept', 'q=0.8;application/json;q=0.9'); //This was needed for firefox, because apparently it doesn't add the "Accept application/json" header automatically
    myHeaders.set('Content-Type', 'application/json');
    // myHeaders.set('authenticationToken', this.Token);
    this._requestOptions = new RequestOptions({
        headers: myHeaders
    });
    this._apiUrl = environment.api_url;//"http://localhost:57543/api/";
  }

  getTeams(competitionId: number) {
    var url = this._apiUrl+"team/teams/"+(competitionId?competitionId:'') ;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  getTeamDetails(id: number) {
    var url = this._apiUrl+"team/teams/"+id+"/year/2009";
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  getTeamCompetitions(id: number) {
    var url = this._apiUrl+"competition/team/"+id;
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
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
    var url = this._apiUrl+"team/clasification/"+teamId+
    "/competition/"+competitionName+"/season/"+season;
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => this.convertToChartData(res.json()));
  }

  getClasificationData(competitionId: number, round: string) {
    var url = this._apiUrl+"team/clasification/"+competitionId+
    "/round/"+round;
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  private convertToChartData(data: any) {
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

  public currentTeam: any;
  private currentTeamSubject: Subject<any> = new Subject<any>();


  public setCurrentTeam(_data: any) {
      this.currentTeam = _data;
      this.currentTeamSubject.next(_data)
  };
  public getCurrentTeam(): Observable<any> {
      return this.currentTeamSubject.asObservable();
  };

}
