import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Team } from '../../shared/interfaces/team.interface';

export function team(state: any = [], action) {
    switch (action.type) {
        case 'ADD_TEAM_SUCCESS': {
            return { data: [...state.data, action.payload] };
        }
        case 'LOAD_TEAMS_SUCCESS': {
            return { 
                ...state,
                data: action.payload,
                loadingSpinner: false 
            };
        }
        case 'REQUEST_TEAMS': {
            return {
                ...state,
                loadingSpinner: true 
            };
        }
        case 'LOAD_TEAM_DETAILS': {
            return {
                ...state,
                loadingSpinner: true 
            };
        }
        case 'LOAD_TEAM_DETAILS_SUCCESS': {
            return {
                ...state,
                current: action.payload,
                loadingSpinner: false
            }
        }
        case 'SAVE_TEAM_DETAILS_SUCCESS': {
            return {
                ...state,
                current: action.payload,
                snackbar: 'Team details have been successfully saved',
                loadingSpinner: false
            }
        }
        case 'SHOW_SNACKBAR': {
            return {
                ...state,
                snackbar: action.payload
            }
        }
        default: {
            return state;
        }
    }
}