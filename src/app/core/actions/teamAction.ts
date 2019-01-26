import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionWithPayload } from './actionWithPayload';
import { Team } from '../../shared/interfaces/team.interface';
@Injectable()
export class TeamActions {
    static REQUEST_TEAMS = 'REQUEST_TEAMS';
    static LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';
    static SEARCH_TEAMS = 'SEARCH_TEAMS';
    static LOAD_TEAM_DETAILS = 'LOAD_TEAM_DETAILS';
    static LOAD_TEAM_DETAILS_SUCCESS = 'LOAD_TEAM_DETAILS_SUCCESS';
    static SAVE_TEAM_DETAILS = 'SAVE_TEAM_DETAILS';
    static SAVE_TEAM_DETAILS_SUCCESS = 'SAVE_TEAM_DETAILS_SUCCESS';

    loadTeams(filter): ActionWithPayload<any> {
        return {
            type: TeamActions.REQUEST_TEAMS,
            payload: filter
        };
    }

    searchTeams(filter): ActionWithPayload<any> {
        return {
            type: TeamActions.SEARCH_TEAMS,
            payload: filter
        };
    }

    loadTeamsSuccess(teams):  ActionWithPayload<any> {
        return {
            type: TeamActions.LOAD_TEAMS_SUCCESS,
            payload: teams
        };
    }

    loadTeamDetails(id: number):  ActionWithPayload<any> {
        return {
            type: TeamActions.LOAD_TEAM_DETAILS,
            payload: id
        };
    }

    loadTeamSuccess(teams: Team[]):  ActionWithPayload<any> {
        return {
            type: TeamActions.LOAD_TEAM_DETAILS_SUCCESS,
            payload: teams
        };
    }

    saveTeamDetails(team: Team):  ActionWithPayload<any> {
        return {
            type: TeamActions.SAVE_TEAM_DETAILS,
            payload: team
        };
    }

    saveTeamSuccess(team: Team):  ActionWithPayload<any> {
        return {
            type: TeamActions.SAVE_TEAM_DETAILS_SUCCESS,
            payload: team
        };
    }
}
