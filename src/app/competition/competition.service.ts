import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Team } from '../shared/interfaces/team.interface';
import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Competition } from '../shared/interfaces/competition.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class CompetitionService extends BaseService {
  public currentCompetition: Competition;
  private currentCompetitionSubject: BehaviorSubject<Competition> = new BehaviorSubject<Competition>(
    null
  );

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getAllCompetitions(): Observable<Competition[]> {
    const url = 'competition';

    return this.get<Competition[]>(url);
  }

  public getTeams(competitionId: number) {
    const url = 'team/teams/' + competitionId;

    return this.get<Team[]>(url);
  }

  public setCurrentCompetition(_data: Competition) {
    this.currentCompetition = _data;
    this.currentCompetitionSubject.next(_data);
  }

  public getCurrentCompetition(): Observable<Competition> {
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

  public getCompetitionDraw(competitionId: number) {
    const url = 'competition/' + competitionId + '/getDraw/';

    return this.get<any>(url);
  }

  public getMatch(matchId: number) {
    const url = 'competition/match/' + matchId;

    return this.get<any>(url);
  }

  getTeamDetails(id: number) {
    const url = 'team/teams/' + id + '/year/2009';

    return this.get<Team>(url);
  }

  getChartDataTeamCompetition(teamId: number, competitionId: number) {
    const url =
      'team/clasification/' + teamId + '/competition/' + competitionId;

    return this.get<any>(url).pipe(map((res) => this.convertToChartData(res)));
  }

  saveCompetitionDetails(competitionDetails: Competition) {
    const url = 'competition/saveCompetitionDetails';

    return this.post<any>(url, competitionDetails);
  }

  getNextSimulationDateTime() {
    return this.get<any>('competition/nextSimulation');
  }

  private convertToChartData(data: any): any {
    const positionList = [],
      goalsForList = [],
      goalsAgainstList = [],
      roundList = [];

    data.clasificationSeasonData.forEach((element) => {
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
      teamName: data.teamName,
    };

    return lineChartData;
  }
}
