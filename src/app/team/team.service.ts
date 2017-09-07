import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {

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
    this._apiUrl = "http://localhost:57543";
  }

  getAllTeams() {
    var url = this._apiUrl+"/api/player/teams";

    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  getTeamDetails(id: number) {
    var url = this._apiUrl+"/api/player/teams/"+id+"/year/2009";
    
    return this.http.get(url, this._requestOptions)
        .map((res: Response) => res.json());
  }

  addBase64Image(image: string, fileName: string) {
    var url = this._apiUrl+"/api/GlobalMedia/UploadBase64Image";
    
    return this.http.post(url, { Base64String:image, FileName: fileName }, this._requestOptions)
        .map((res: Response) => res.json());
  }

  updateTeamImage(teamId: number, mediaItem: any){
    var url = this._apiUrl+"/api/player/UpdateTeamPicture/"+teamId;
    
    return this.http.post(url, mediaItem, this._requestOptions)
        .map((res: Response) => res.json());
  }

}
