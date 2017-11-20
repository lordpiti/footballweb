import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  constructor(private sharedService: ShareDataService, private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.sharedService.setCurrentArea(AppAreas.Players);
    },0);

    // this.route.params.subscribe(params => {
    //   let playerId = +params['id']; // (+) converts string 'id' to a number

    //   this.playerService.getPlayers(playerId).subscribe(
    //     (playerData: any) => {
    //         this.competitionDetails = competitionData;
    //         this._competitionService.setCurrentCompetition(competitionData);
    //     },
    //     (err: any) => {
    //     }
    //   );
    // });

  }

}
