import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Team } from '../shared/interfaces/team.interface';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompetitionService extends BaseService {

  public currentCompetition: any;
  private currentCompetitionSubject: Subject<any> = new Subject<any>();

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }


  getAllCompetitions() {
    const url = 'competition';

    return this.get<any>(url);
  }

  public getTeams(competitionId: number) {
    const url = 'team/teams/' + competitionId;

    return this.get<Team[]>(url);
  }

  public setCurrentCompetition(_data: any) {
      this.currentCompetition = _data;
      this.currentCompetitionSubject.next(_data);
  }

  public getCurrentCompetition(): Observable<any> {
      return this.currentCompetitionSubject.asObservable();
  }

  public getCompetitionDetails(id: number) {
    const url = 'competition/' + id;

    return this.get<any>(url);
  }

  public getCompetitionRoundGames(competitionId: number, round: string) {
    const url = 'competition/' + competitionId + '/round/' + round;

    return this.get<any>(url);
  }

  public getMatch(matchId: number) {
    const url = 'competition/match/' + matchId;

    return this.get<any>(url);
  }

}
