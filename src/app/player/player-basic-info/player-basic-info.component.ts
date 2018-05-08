import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CropperSettings } from 'ngx-img-cropper';
import { CropperPictureDialogComponent } from '../../shared/components/cropper-picture-dialog/cropper-picture-dialog.component';

@Component({
  selector: 'app-player-basic-info',
  templateUrl: './player-basic-info.component.html',
  styleUrls: ['./player-basic-info.component.scss']
})
export class PlayerBasicInfoComponent implements OnInit {

  playerDetails: Player = {
    birthDate: null,
    birthPlace: null,
    dorsal: null,
    height: null,
    name: null,
    picture: {bytes: null, base64String: null, fileName: null, url: null, containerReference: null},
    playerId: null,
    position: null,
    surname: null,
    teamId: null,
    teamName: null
  };

  positions: Array<any> = [{ value: 'Defender', text: 'Defender'}, { value: 'Striker', text: 'Striker'}];

  constructor( public playerService: PlayerService,
    private route: ActivatedRoute, public dialog: MatDialog) {

    }

  ngOnInit() {

    if (this.playerService.currentPlayer) {
      this.playerDetails = this.playerService.currentPlayer;
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = data;
    });

  }

  savePlayerDetails(player: Player, form: NgForm) {

    const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

    if (this.playerDetails.picture.url.includes(';base64')) {
      this.playerService.addBase64Image(this.playerDetails.picture.url, cropperImageName)
      .switchMap(data => {
          player.picture = data;
          return this.playerService.savePlayerDetails(player);
      }).subscribe( x => {
        alert('Player details successfully saved');
      },
      (err: any) => {});
    } else {
      this.playerService.savePlayerDetails(player).subscribe( x => {
        alert('Player details successfully saved');
      },
      (err: any) => {});
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CropperPictureDialogComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.playerDetails.picture
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result) {
        this.playerDetails.picture.url = result;
      }
    });
  }
}

