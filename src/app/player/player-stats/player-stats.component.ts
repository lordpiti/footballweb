import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular-boost';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {

  matches: any[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
            player(id: 1) {
                name, surname
                playerMatchesPlayed {
                    localTeamName, visitorTeamName, id, localGoals, visitorGoals, date
                }
            }
        }
    `,
      })
      .valueChanges.subscribe((result: any) => {
        this.matches = result.data.player.playerMatchesPlayed;
      });
  }

}
