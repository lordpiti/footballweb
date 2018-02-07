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

  constructor( private playerService: PlayerService, 
    private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {

    if (this.playerService.currentPlayer){
      this.playerDetails = this.playerService.currentPlayer;
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = this.playerService.currentPlayer;
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
  
  test(data: any){
    this.playerDetails.name = data.target.value;
  }

}
