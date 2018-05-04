import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';
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
                local: data.matchToCreate.partido.cod_Local,
                visitor: data.matchToCreate.partido.cod_Visitante,
                goalsLocal: 0,
                goalsVisitor: 0,
                matchEvents: [],
                finished: false,
                date: data.matchToCreate.partido.fecha,
                localTeam: data.localTeam,
                visitorTeam: data.visitorTeam,
                matchId: data.matchId
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
