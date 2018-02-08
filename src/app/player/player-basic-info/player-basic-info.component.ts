import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-basic-info',
  templateUrl: './player-basic-info.component.html',
  styleUrls: ['./player-basic-info.component.scss']
})
export class PlayerBasicInfoComponent implements OnInit {

  playerDetails : Player = null;

  positions: Array<any>= [{ value: 'Defender', text: 'Defender'}, { value: 'Striker', text: 'Striker'}];

  constructor( private playerService: PlayerService, 
    private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {

    if (this.playerService.currentPlayer){
      this.playerDetails = this.playerService.currentPlayer;
      this.playerDetails.position = 'Striker';
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = this.playerService.currentPlayer;
      this.playerDetails.position = 'Striker';
    });


  }

  savePlayerDetails(player: Player, form: NgForm){
    
    if (form.valid){
      this.playerService.savePlayerDetails(player).subscribe(
        (data: boolean) => {
          this.toastr.success('Player details successfully saved', 'Success!');
        },
        (err: any) => {
        }
      );
    }
  }
  
  updatePlayerName(data: any){
    this.playerDetails.name = data;
  }

  updatePlayerSurname(data: any){
    this.playerDetails.surname = data;
  }

  updatePlayerPosition(data: any){
    this.playerDetails.position = data;
  }
}
