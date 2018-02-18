import { MatchEventTypes } from '../enums/match-event-types';
import { Player } from './player.interface';
import { Team } from './team.interface';

export interface MatchEvent {
    minute: number;
    description: string;
    matchEventType: MatchEventTypes;
    matchId: number;
    player1: Player;
    player2: Player;
    team1: Team;
}
