import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-basic-info',
  templateUrl: './player-basic-info.component.html',
  styleUrls: ['./player-basic-info.component.scss']
})
export class PlayerBasicInfoComponent implements OnInit {

  playerDetails: Player = null;

  positions: Array<any> = [{ value: 'Defender', text: 'Defender'}, { value: 'Striker', text: 'Striker'}];

  constructor( public playerService: PlayerService,
    private route: ActivatedRoute) {

    }

  ngOnInit() {

    if (this.playerService.currentPlayer) {
      this.playerDetails = this.playerService.currentPlayer;
      this.playerDetails.position = 'Striker';
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = data;
      this.playerDetails.position = 'Striker';
    });


  }

  savePlayerDetails(player: Player, form: NgForm) {

    if (form.valid) {
      this.playerService.savePlayerDetails(player).subscribe(
        (data: boolean) => {
          alert('Player details successfully saved');
        },
        (err: any) => {
        }
      );
    }
  }
}
