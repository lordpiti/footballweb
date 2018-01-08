import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Player } from '../../shared/interfaces/player.interface';

@Component({
  selector: 'app-player-basic-info',
  templateUrl: './player-basic-info.component.html',
  styleUrls: ['./player-basic-info.component.scss']
})
export class PlayerBasicInfoComponent implements OnInit {

  currentPlayer : Player = null;

  constructor( private playerService: PlayerService, 
    private route: ActivatedRoute, public toastr: ToastsManager) { }

  ngOnInit() {

    if (this.playerService.currentPlayer){
      this.currentPlayer = this.playerService.currentPlayer;
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.currentPlayer = this.playerService.currentPlayer;
    });


  }
  

}
