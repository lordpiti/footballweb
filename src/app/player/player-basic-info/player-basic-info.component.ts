import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../shared/interfaces/player.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-player-basic-info',
  templateUrl: './player-basic-info.component.html',
  styleUrls: ['./player-basic-info.component.scss']
})
export class PlayerBasicInfoComponent implements OnInit {

  playerDetails: Player = null;

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { name: 'bu', animal: 'bah' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
