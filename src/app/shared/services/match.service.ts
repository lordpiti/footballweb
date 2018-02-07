import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MatchService extends BaseService {
  
  constructor(public httpNew:HttpClient) {
    super(httpNew);
  }

  public getMatch(matchId:number) {
    var url = this._apiUrl+'competition/match/'+matchId;

    return this.httpNew.get(url, { headers: this._headers })
      .map(data => this.convertToMatchData(data));
  }

  public getMatchPlayerStatistics(playerId: number, matchId:number) {
    var url = this._apiUrl+'player/'+playerId+'/MatchPlayedStatistics/'+matchId;

    return this.httpNew.get(url, { headers: this._headers });
  }

  private convertToMatchData(matchData: any):any {
    matchData.players.forEach(player=> {
      player.goals = [];
      player.bookings = [];
      let booking = matchData.statisticsIncidences.bookings.find(booking=>booking.player.playerId == player.playerId);
      if (booking){
        player.bookings.push(booking);
      }
      let goal = matchData.statisticsIncidences.goals.find(goal=>goal.player.playerId == player.playerId);
      if (goal){
        player.goals.push(goal);
      }
      let substitutionIn = matchData.statisticsIncidences.substitutions.find(substitution=>substitution.playerIn.playerId == player.playerId);
      if (substitutionIn){
        player.substitutionIn = substitutionIn;
      }
      let substitutionOut = matchData.statisticsIncidences.substitutions.find(substitution=>substitution.playerOut.playerId == player.playerId);
      if (substitutionOut){
        player.substitutionOut = substitutionOut;
      }
    });

    return matchData;
  }
}