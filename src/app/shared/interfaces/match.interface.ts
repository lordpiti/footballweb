import { Team } from './team.interface';
import { MatchEvent } from './match-event.interface';

export interface Match {
    local: number;
    visitor: number;
    goalsLocal: number;
    goalsVisitor: number;
    matchEvents: MatchEvent[];
    id: number;
    finished: boolean;
    localTeam: Team;
    visitorTeam: Team;
    matchId: number;
    date: Date;
}
