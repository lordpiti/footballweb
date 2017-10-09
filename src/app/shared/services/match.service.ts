import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class MatchService {

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
    this._apiUrl = environment.api_url;
  }

  public getMatch(matchId:number) {
    var url = this._apiUrl+'competition/match/'+matchId;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => this.convertToMatchData(res.json()));
  }

  public getMatchPlayerStatistics(playerId: number, matchId:number) {
    var url = this._apiUrl+'player/'+playerId+'/MatchPlayedStatistics/'+matchId;

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
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