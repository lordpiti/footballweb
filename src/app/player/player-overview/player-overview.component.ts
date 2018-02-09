import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { PlayerService } from '../player.service';
import { Player } from '../../shared/interfaces/player.interface';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {

  public playerList: Array<Player>;
  public p = 1;

  constructor(private sharedService: ShareDataService, private playerService: PlayerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Players);
    }, 0);

    this.playerService.getPlayers().subscribe(
      (data: Array<Player>) => {
          this.playerList = data;
      },
      (err: any) => {
      }
    );
  }

}
