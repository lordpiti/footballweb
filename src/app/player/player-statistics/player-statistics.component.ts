import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr-client';
import { environment } from '../../../environments/environment';

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
