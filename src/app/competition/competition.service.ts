import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CompetitionService extends BaseService {
  
  public currentCompetition: any;
  private currentCompetitionSubject: Subject<any> = new Subject<any>();
  
  constructor(public http: Http, public sharedService: ShareDataService) {
    super(http, sharedService);
  }


  getAllCompetitions() {
    var url = "competition";

    return this.get(url);
  }

  public getTeams(competitionId: number) {
    var url = "team/teams/"+competitionId;

    return this.get(url);
  }

  public setCurrentCompetition(_data: any) {
      this.currentCompetition = _data;
      this.currentCompetitionSubject.next(_data)
  };
  public getCurrentCompetition(): Observable<any> {
      return this.currentCompetitionSubject.asObservable();
  };

  public getCompetitionDetails(id: number) {
    var url = "competition/"+id;
    
    return this.get(url);
  }

  public getCompetitionRoundGames(competitionId: number, round: string) {
    var url = "competition/"+competitionId+"/round/"+round;
    
    return this.get(url);
  }

  public getMatch(matchId:number) {
    var url = 'competition/match/'+matchId;

    return this.get(url);
  }

}