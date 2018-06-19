import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CropperSettings } from 'ngx-img-cropper';
import { CropperPictureDialogComponent } from '../../shared/components/cropper-picture-dialog/cropper-picture-dialog.component';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  constructor( public playerService: PlayerService, private blobDataService: BlobDataService,
    private route: ActivatedRoute, public dialog: MatDialog) {

    }

  userSettings: any = {};

  autoCompleteCallback1(selectedData: any) {
    this.playerDetails.birthPlace = selectedData.data.description;
  }

  ngOnInit() {

    if (this.playerService.currentPlayer) {
      this.playerDetails = this.playerService.currentPlayer;
      this.userSettings.inputString = this.playerDetails.birthPlace;
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = data;
      this.userSettings.inputString = this.playerDetails.birthPlace;
    });

  }

  savePlayerDetails(player: Player, form: NgForm) {
    const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

    if (this.playerDetails.picture.url.includes(';base64')) {
      this.blobDataService.addBase64Image(this.playerDetails.picture.url, cropperImageName)
      .pipe(switchMap(data => {
          player.picture = data;
          return this.playerService.savePlayerDetails(player);
      })).subscribe( x => {
        this.playerService.setCurrentPlayer(player);
        alert('Player details successfully saved');
      },
      (err: any) => {});
    } else {
      this.playerService.savePlayerDetails(player).subscribe( x => {
        this.playerService.setCurrentPlayer(player);
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

