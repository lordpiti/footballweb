import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Player } from '../shared/interfaces/player.interface';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class PlayerService extends BaseService {

  public currentPlayer: Player;
  private currentPlayerSubject: Subject<Player> = new Subject<Player>();

  constructor(public http: Http, public sharedService: ShareDataService, public httpNew:HttpClient) {
    super(http, sharedService, httpNew);
  }

  // getPlayers() {
  //   var url = this._apiUrl+"player/";

  //   return this.http.get(url, this._requestOptions)
  //       .map((res: Response) => (res.json() as Player[]).sort(function(a, b) {
  //         var nameA = a.surname.toUpperCase(); // ignore upper and lowercase
  //         var nameB = b.surname.toUpperCase(); // ignore upper and lowercase
  //         if (nameA < nameB) {
  //           return -1;
  //         }
  //         if (nameA > nameB) {
  //           return 1;
  //         }
        
  //         // names must be equal
  //         return 0;
  //       }));
  // }

  getPlayers2() {
    var url = this._apiUrl+"player/";

    return this.httpNew.get<Array<Player>>(url)
      .map(res => res.sort(function(a, b) {
      var nameA = a.surname.toUpperCase(); // ignore upper and lowercase
      var nameB = b.surname.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    }));
  }

  getPlayerDetails(id: number) {
    var url = this._apiUrl+"player/"+id;
    
    return this.httpNew.get<Player>(url, { headers: this._headers });
  }

  savePlayerDetails(playerDetails: Player) {
    var url = this._apiUrl+"player/savePlayerDetails";
    
    return this.http.post(url, playerDetails, this._requestOptions)
        .map((res: Response) => res.json());
  }


  public setCurrentPlayer(_data: Player) {
      this.currentPlayer = _data;

      this.currentPlayerSubject.next(_data)
  };

  public getCurrentPlayer(): Observable<Player> {
      return this.currentPlayerSubject.asObservable();
  };  
  

}
