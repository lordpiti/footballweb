import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr-client';
import { environment } from '../../../environments/environment';
import { MatchEvent } from '../../shared/interfaces/match-event.interface';
import { Match } from '../../shared/interfaces/match.interface';
import { MatchEventTypes } from '../../shared/enums/match-event-types';

@Component({
  selector: 'app-competition-simulation',
  templateUrl: './competition-simulation.component.html',
  styleUrls: ['./competition-simulation.component.scss']
})
export class CompetitionSimulationComponent implements OnInit {

private _hubConnection: HubConnection;
public async: any;
message = '';
messages: string[] = [];

public matches: Match[] = [];

constructor() {
}

public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    this._hubConnection.invoke('Send', data);
    this.messages.push(data);
}

ngOnInit() {
    this._hubConnection = new HubConnection(environment.hubUrl + '/loopy');

    this._hubConnection.on('Send', (data: MatchEvent) => {
        const received = `Received: ${data}`;
        this.messages.push(received);

        // look for match in the list and push the event to the list
        const eventMatch = this.matches.find(match => match.id === data.matchId);
        eventMatch.matchEvents.push(data);

        switch (data.matchEventType) {
            case MatchEventTypes.GameFinished:
                eventMatch.finished = true;
                break;
            case MatchEventTypes.Goal:
                // find team for the player and increase goals
            default:
                break;
        }

    });

    this._hubConnection.on('StartSimulation', (data: any) => {
        this.matches = [];
    });

    this._hubConnection.on('SendCreateMatch', (data: any) => {
        const received = `Received: ${data}`;
        this.messages.push(received);

        if (data.matchId) {
            let existingMatch = this.matches.find(match => match.id === data.matchId);
            // create the new match object
            const newMatch: Match = {
                id: data.matchId,
                local: 3,
                visitor: 4,
                goalsLocal: 0,
                goalsVisitor: 0,
                matchEvents: [],
                finished: false
            };
            if (existingMatch === undefined) {
                this.matches.push(newMatch);
            } else {
                existingMatch = newMatch;
            }
        }
    });

    this._hubConnection.start()
        .then(() => {
            console.log('Hub connection started');
        })
        .catch(err => {
            console.log('Error while establishing connection');
        });
}

}
