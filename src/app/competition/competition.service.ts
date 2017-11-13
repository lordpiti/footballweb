import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';

@Injectable()
export class CompetitionService extends BaseService {
  
  public currentCompetition: any;
  private currentCompetitionSubject: Subject<any> = new Subject<any>();
  
  constructor(public http: Http) {
    super(http);
  }


  getAllCompetitions() {
    var url = this._apiUrl+"competition";

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  public getTeams(competitionId: number) {
    var url = this._apiUrl+"team/teams/"+competitionId;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  public setCurrentCompetition(_data: any) {
      this.currentCompetition = _data;
      this.currentCompetitionSubject.next(_data)
  };
  public getCurrentCompetition(): Observable<any> {
      return this.currentCompetitionSubject.asObservable();
  };

  public getCompetitionDetails(id: number) {
    var url = this._apiUrl+"competition/"+id;
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  public getCompetitionRoundGames(competitionId: number, round: string) {
    var url = this._apiUrl+"competition/"+competitionId+"/round/"+round;
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  public getMatch(matchId:number) {
    var url = this._apiUrl+'competition/match/'+matchId;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

}