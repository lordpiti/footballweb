import { MatchEventTypes } from '../enums/match-event-types';

export interface MatchEvent {
    minute: number;
    description: string;
    eventType: MatchEventTypes;
    matchId: number;
}
