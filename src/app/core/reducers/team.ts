import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Team } from '../../shared/interfaces/team.interface';

export function team(state: any = [], action) {
    switch (action.type) {
        case 'ADD_TEAM_SUCCESS': {
            return { data: [...state.data, action.payload] };
        }
        case 'LOAD_TEAMS_SUCCESS': {
            return { ...state, data: action.payload, loadingSpinner: false };
        }
        case 'REQUEST_TEAMS': {
            return { ...state, loadingSpinner: true };
        }
        default: {
            return state;
        }
    }
}