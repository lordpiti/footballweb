import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionWithPayload } from './actionWithPayload';
@Injectable()
export class TeamActions {
    static REQUEST_TEAMS = 'REQUEST_TEAMS';
    static LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';

    loadTeams(filter): ActionWithPayload<any> {
        return {
            type: TeamActions.REQUEST_TEAMS,
            payload: filter
        };
    }

    loadTeamsSuccess(teams):  ActionWithPayload<any> {
        return {
            type: TeamActions.LOAD_TEAMS_SUCCESS,
            payload: teams
        };
    }
}
