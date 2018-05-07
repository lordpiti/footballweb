import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { map, filter, catchError, mergeMap, switchMap, combineLatest } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { ShareDataService } from '../shared/services/shared-data.service';
import { Player } from '../shared/interfaces/player.interface';
import { Subject ,  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PlayerService extends BaseService {

  public currentPlayer: Player;
  private currentPlayerSubject: Subject<Player> = new Subject<Player>();

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  getPlayers(): Observable<Player[]> {
    const url = 'player/';

    return this.get<Array<Player>>(url).pipe(
      map(res => res.sort(function(a, b) {
      const nameA = a.surname.toUpperCase(); // ignore upper and lowercase
      const nameB = b.surname.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })));
  }

  getPlayerDetails(id: number): Observable<Player> {
    const url = 'player/' + id;

    return this.get<Player>(url);
  }

  savePlayerDetails(playerDetails: Player) {
    const url = 'player/savePlayerDetails';

    return this.post<any>(url, playerDetails);
  }

  public setCurrentPlayer(_data: Player) {
      this.currentPlayer = _data;

      this.currentPlayerSubject.next(_data);
  }

  public getCurrentPlayer(): Observable<Player> {
      return this.currentPlayerSubject.asObservable();
  }

  public addBase64Image(image: string, fileName: string) {
    const url = 'GlobalMedia/UploadBase64Image';

    return this.post<any>(url, { Base64String: image, FileName: fileName });
  }
}
