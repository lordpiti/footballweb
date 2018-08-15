import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { MatchPlayedStatistics } from '../interfaces/match-played-statistics.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class MatchService extends BaseService {

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  public getMatch(matchId: number) {
    const url = 'competition/match/' + matchId;

    return this.get<any>(url).pipe(map(data => this.convertToMatchData(data)));
  }

  public getMatchPlayerStatistics(playerId: number, matchId: number) {
    const url = 'player/' + playerId + '/MatchPlayedStatistics/' + matchId;

    return this.get<MatchPlayedStatistics>(url);
  }

  private convertToMatchData(matchData: any): any {
    matchData.players.forEach(player => {
      player.goals = [];
      player.bookings = [];

      const booking = matchData.statisticsIncidences.bookings.find(b => b.player.playerId === player.playerId);
      if (booking) {
        player.bookings.push(booking);
      }

      const goal = matchData.statisticsIncidences.goals.find(g => g.player.playerId === player.playerId);
      if (goal) {
        player.goals.push(goal);
      }

      const substitutionIn = matchData.statisticsIncidences.substitutions
      .find(substitution => substitution.playerIn.playerId === player.playerId);
      if (substitutionIn) {
        player.substitutionIn = substitutionIn;
      }

      const substitutionOut = matchData.statisticsIncidences.substitutions
      .find(substitution => substitution.playerOut.playerId === player.playerId);
      if (substitutionOut) {
        player.substitutionOut = substitutionOut;
      }
    });

    return matchData;
  }
}
