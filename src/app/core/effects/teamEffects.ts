import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { TeamService } from '../../team/team.service';
import { TeamActions } from '../actions/teamAction';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { Team } from '../../shared/interfaces/team.interface';

@Injectable()
export class TeamEffects {

    @Effect()
    loadTeams$: Observable<Action> = this.actions$
        .ofType('REQUEST_TEAMS').pipe(
        switchMap(action => this.teamService.getTeams(action.payload))
        , map((teams: any) => this.teamActions.loadTeamsSuccess(teams)
        ));

    @Effect()
    searchTeams$: Observable<Action> = this.actions$
        .ofType('SEARCH_TEAMS').pipe(
        switchMap(action => this.teamService.getTeamsByName(action.payload)),
        map((teams: any) => {
            return this.teamActions.loadTeamsSuccess(teams);
         }
        ));

    @Effect()
    loadTeamDetails$: Observable<Action> = this.actions$
        .ofType('LOAD_TEAM_DETAILS').pipe(
        switchMap(action => this.teamService.getTeamDetails(action.payload)),
        map((teams: any) => {
            return this.teamActions.loadTeamSuccess(teams);
         }
        ));

    @Effect()
    saveTeamDetails$: Observable<Action> = this.actions$
        .ofType('SAVE_TEAM_DETAILS').pipe(
            switchMap(action => {
                const team = action.payload;
                const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';
                if (action.payload.pictureLogo.url.includes(';base64')) {
                    return this.blobStorageService.addBase64Image(team.pictureLogo.url, cropperImageName)
                    .pipe(switchMap(data => {
                        team.pictureLogo = data;
                        return this.teamService.saveTeamDetails(team).pipe(switchMap(x=>of(team)));
                    }));
                } else {
                    return this.teamService.saveTeamDetails(team).pipe(switchMap(x=>of(team)));
                }
            }),
            map((team: Team) => {
                return this.teamActions.saveTeamSuccess(team);
             }
            ));

    constructor(
        private actions$: Actions<ActionWithPayload<any>>,
        private teamService: TeamService,
        private blobStorageService: BlobDataService,
        private teamActions: TeamActions
    ) { }
}
