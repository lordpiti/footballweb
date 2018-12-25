import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../../shared/interfaces/player.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { switchMap } from 'rxjs/operators';
import { PlayerInfoModalComponent } from './player-info-modal/player-info-modal.component';

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

  constructor( public playerService: PlayerService, private blobDataService: BlobDataService,
    public dialog: MatDialog, public snackBar: MatSnackBar) {

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


  openDialog(): void {
    const dialogRef = this.dialog.open(PlayerInfoModalComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.playerDetails
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.playerDetails = result;
        const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';
        if (this.playerDetails.picture.url.includes(';base64')) {
          this.blobDataService.addBase64Image(this.playerDetails.picture.url, cropperImageName)
          .pipe(switchMap(data => {
              result.picture = data;
              return this.playerService.savePlayerDetails(this.playerDetails);
          })).subscribe( x => {
            this.playerService.setCurrentPlayer(this.playerDetails);
            this.openSnackBar('Player details successfully saved', 'close');
          },
          (err: any) => {});
        } else {
        this.playerService.savePlayerDetails(this.playerDetails).subscribe( x => {
          this.playerService.setCurrentPlayer(this.playerDetails);
          this.openSnackBar('Player details successfully saved', 'close');
          },
          (err: any) => {});
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
