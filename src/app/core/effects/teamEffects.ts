import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { TeamService } from '../../team/team.service';
import { TeamActions } from '../actions/teamAction';

@Injectable()
export class TeamEffects {

    @Effect()
    loadTeams$: Observable<Action> = this.actions$
        .ofType('REQUEST_TEAMS')
        .switchMap(action => this.teamService.getTeams(action.payload))
        .map((teams: any) => this.teamActions.loadTeamsSuccess(teams)
        );

    @Effect()
    searchTeams$: Observable<Action> = this.actions$
        .ofType('SEARCH_TEAMS')
        .switchMap(action => this.teamService.getTeamsByName(action.payload))
        .map((teams: any) => {
            return this.teamActions.loadTeamsSuccess(teams);
         }
        );

    constructor(
        private actions$: Actions<ActionWithPayload<any>>,
        private teamService: TeamService,
        private teamActions: TeamActions
    ) { }
}
