import { ShareDataService } from "../../shared/services/shared-data.service";
import { AppAreas } from "../../shared/enums/app-areas";
import { PlayerService } from "../player.service";
import { ActivatedRoute } from "@angular/router";
import { Player } from "../../shared/interfaces/player.interface";
import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { DetailsMenuData } from "../../shared/interfaces/details-menu-data.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-player-detail",
  templateUrl: "./player-detail.component.html",
  styleUrls: ["./player-detail.component.scss"],
})
export class PlayerDetailComponent implements OnInit {
  public playerDetails$: Observable<Player>;
  public playerDetailsMenuData: DetailsMenuData;

  constructor(
    private sharedService: ShareDataService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Players);
    }, 0);

    this.playerDetails$ = this.playerService.getCurrentPlayer();

    this.playerDetails$.subscribe((playerData) => {
      if (playerData) {
        this.playerDetailsMenuData = {
          title: playerData.name + " " + playerData.surname,
          imageUrl: playerData.picture.url,
          entityName: "Players",
          itemsList: [
            {
              title: "Summary",
              link: "summary",
            },
            {
              title: "Statistics",
              link: "stats",
            },
          ],
          dataLoaded: true,
        };
      }
    });

    this.route.params.subscribe((params) => {
      const playerId = +params["id"]; // (+) converts string 'id' to a number

      this.getData(playerId);
    });
  }

  private getData(id: number): void {
    this.playerService.getPlayerDetails(id).subscribe(
      (playerData: Player) => {
        this.playerService.setCurrentPlayer(playerData);
      },
      (err: any) => {}
    );
  }
}
