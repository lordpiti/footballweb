import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DetailsMenuData } from '../../shared/interfaces/details-menu-data.interface';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, OnChanges {

  public playerDetails: Player;
  public playerDetailsMenuData: DetailsMenuData;
  public playerPicture: any;

  @Input() newid: number = null;

  constructor(private sharedService: ShareDataService, private playerService: PlayerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Players);
    }, 0);


     if (!this.newid) {
       // let id = this.route.snapshot.params['id'];

       this.route.params.subscribe(params => {
         this.newid = +params['id']; // (+) converts string 'id' to a number

         this.getData(this.newid);

       });
     } else {
       this.getData(this.newid);
     }
  }

  ngOnChanges(changes: any) {
    this.getData(changes.newid.currentValue);
  }


  savePlayerDetails(player: Player, form: NgForm) {

    if (form.valid) {
      // player.pictureLogo = this.teamLogo;
      this.playerService.savePlayerDetails(player).subscribe(
        (data: boolean) => {
          alert('Player details successfully saved');
        },
        (err: any) => {
        }
      );
    }
  }

  private getData(id: number): void {
    this.playerService.getPlayerDetails(id).subscribe(
      (playerData: Player) => {
          this.playerDetails = playerData;
          this.playerService.setCurrentPlayer(playerData);
          this.playerDetailsMenuData = {
            title: playerData.name + ' ' + playerData.surname,
            imageUrl: '',
            entityName: 'Players',
            itemsList: [
              {
                title: 'Summary',
                link: 'summary'
              },
              {
                title: 'Statistics',
                link: 'statistics'
              }
            ],
            dataLoaded: true
          };
      },
      (err: any) => {
      }
    );
  }

}
