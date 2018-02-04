import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompetitionService extends BaseService {
  
  public currentCompetition: any;
  private currentCompetitionSubject: Subject<any> = new Subject<any>();
  
  constructor(public sharedService: ShareDataService, public httpClient: HttpClient) {
    super(sharedService, httpClient);
  }


  getAllCompetitions() {
    var url = this._apiUrl+"competition";

    return this.httpNew.get(url, { headers: this._headers });
  }

  public getTeams(competitionId: number) {
    var url = this._apiUrl+"team/teams/"+competitionId;

    return this.httpNew.get(url, { headers: this._headers });
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
    
    return this.httpNew.get(url, { headers: this._headers });
  }

  public getCompetitionRoundGames(competitionId: number, round: string) {
    var url = this._apiUrl+"competition/"+competitionId+"/round/"+round;
    
    return this.httpNew.get(url, { headers: this._headers });
  }

  public getMatch(matchId:number) {
    var url = this._apiUrl+'competition/match/'+matchId;

    return this.httpNew.get(url, { headers: this._headers });
  }

}