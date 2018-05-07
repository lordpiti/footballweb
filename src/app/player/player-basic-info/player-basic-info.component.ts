import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CropperSettings } from 'ngx-img-cropper';

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
      this.playerDetails.position = 'Striker';
    }

    this.playerService.getCurrentPlayer().subscribe(data => {
      this.playerDetails = data;
      this.playerDetails.position = 'Striker';
    });

  }

  savePlayerDetails(player: Player, form: NgForm) {

    const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

    this.playerService.addBase64Image(this.playerDetails.picture.url, cropperImageName)
    .switchMap(data => {
        player.picture = data;
        return this.playerService.savePlayerDetails(player);
    }).subscribe( x => {
      alert('Player details successfully saved');
    },
    (err: any) => {});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.playerDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.playerDetails.picture.url = result;
    });
  }
}


@Component({
  selector: 'app-player-picture-dialog',
  templateUrl: 'player-picture-dialog.component.html',
  styleUrls: ['./player-picture-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {

  private cropperSettings: CropperSettings;

  public published = false;
  public model: Player = {
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
  public displayErrors = false;
  public isEditing = false;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _playerService: PlayerService) {
      if (data) {
        Object.assign(this.model, data);
        this.isEditing = true;
      }
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = { image: data.picture.url };
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
