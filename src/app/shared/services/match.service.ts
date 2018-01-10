import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';
import { ShareDataService } from './shared-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MatchService extends BaseService {
  
  constructor(public http: Http, sharedService: ShareDataService, public httpNew:HttpClient) {
    super(http, sharedService, httpNew);
  }

  public getMatch(matchId:number) {
    var url = 'competition/match/'+matchId;

    return this.get(url)
        .map((res: Response) => this.convertToMatchData(res));
  }

  public getMatchPlayerStatistics(playerId: number, matchId:number) {
    var url = 'player/'+playerId+'/MatchPlayedStatistics/'+matchId;

    return this.http.get(url);
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