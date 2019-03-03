import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular-boost';
import Helpers from '../../shared/utils/helpers';
import { ShareDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {

  matchesGrouped: any[];
  loading: boolean;
  error: any;
  panelOpenState = false;

  constructor(private apollo: Apollo, private sharedService: ShareDataService) {}

  ngOnInit() {
    this.sharedService.setData(true);
    this.apollo
      .watchQuery({
        query: gql`
        {
            player(id: 1) {
                name, surname
                playerMatchesPlayed {
                    localTeamName, visitorTeamName, id, localGoals, visitorGoals, date,
                    competition {
                      id, name, season, type
                    }
                }
            }
        }
    `,
      })
      .valueChanges.subscribe((result: any) => {
        this.sharedService.setData(false);
        const matches = result.data.player.playerMatchesPlayed;
        this.matchesGrouped = this.transformData(matches);
      });
  }

  private transformData(gamesList: any) {
    const groupedCompetitions = Helpers.groupBy(gamesList, 'competition.id');

    const allCompetitions = gamesList.map(x => x.competition);

    const uniqueCompetitions = Helpers.removeDuplicates(allCompetitions, 'id');

    const matchListGroupedByCompetition = Object.entries(groupedCompetitions).map(group => {
      return {
        competition: uniqueCompetitions.find(x => group[0] === x.id.toString()),
        data: group[1]
      };
    });

    return matchListGroupedByCompetition;
  }

}
