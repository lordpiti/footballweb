import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {

	private _requestOptions: RequestOptions;
	private _apiUrl: string;
	private _impactList:Array<any>;
	private _supportWays:Array<any>;

	private _lastStepCompleted: number;
	private _token: string;

    // private colours : ProjectFollowedSurveyColours = { BackgroundColour:"", RightPanelColour:"bg-white" };
    // public colourSubject: Subject<ProjectFollowedSurveyColours> = new Subject<ProjectFollowedSurveyColours>();

    // public currentProjectFollowedData : ProjectFollowedData = null;
    // public currentProjectFollowedDataSubject: Subject<ProjectFollowedData> = new Subject<ProjectFollowedData>();

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


	// completeSurvey(data:any) {

    //     var url = this._apiUrl+"/api/projects/FinishSurvey";

    //     var dataToPost = { Data: data, Token: this._token};
    //     return this.http.post(url, dataToPost, this._requestOptions)
    //         .map((res: Response) => res.json());
    // }

    getAllTeams(id: number) {

        var url = this._apiUrl+"/api/projects/FollowedSurveyData/"+id;


        return this.http.get(url, this._requestOptions)
            .map((res: Response) => res.json());
    }
}