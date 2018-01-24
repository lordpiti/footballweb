import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr-client';
import { environment } from '../../../environments/environment';
import { MatchEvent } from '../../shared/interfaces/match-event.interface';
import { Match } from '../../shared/interfaces/match.interface';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {

private _hubConnection: HubConnection;
public async: any;
message = '';
messages: string[] = [];

public matches: Match[] =[];

constructor() {
}

public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    this._hubConnection.invoke('Send', data);
    this.messages.push(data);
}

ngOnInit() {
    this._hubConnection = new HubConnection(environment.hubUrl+'/loopy');

    this._hubConnection.on('Send', (data: any) => {
        const received = `Received: ${data}`;
        this.messages.push(received);

        if (data.matchId){
            if (this.matches.find(match => match.id == data.matchId)==undefined){
                //create the new match object
                let newMatch: Match = { 
                    id: data.matchId, 
                    local: 3, 
                    visitor: 4, 
                    goalsLocal: 2,
                    goalsVisitor: 3,
                    matchEvents: []
                };
                this.matches.push(newMatch);
                console.log(data);
            }
        }

        if (data.matchEventType){
            //look for match in the list and push the event to the list
            let eventMatch = this.matches.find(match => match.id == data.matchId);
            eventMatch.matchEvents.push(data);
        }
        else{
            console.log(data);
            
        }
    });

    this._hubConnection.start()
        .then(() => {
            console.log('Hub connection started')
        })
        .catch(err => {
            console.log('Error while establishing connection')
        });
}

}
