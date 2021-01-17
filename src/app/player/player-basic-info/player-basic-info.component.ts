import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../player.service";
import { Player } from "../../shared/interfaces/player.interface";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BlobDataService } from "../../shared/services/blob-data.service";
import { switchMap } from "rxjs/operators";
import { PlayerInfoModalComponent } from "./player-info-modal/player-info-modal.component";
import { Observable } from "rxjs";

@Component({
  selector: "app-player-basic-info",
  templateUrl: "./player-basic-info.component.html",
  styleUrls: ["./player-basic-info.component.scss"],
})
export class PlayerBasicInfoComponent implements OnInit {
  playerDetails$: Observable<Player>;

  userRole = localStorage.role;

  constructor(
    public playerService: PlayerService,
    private blobDataService: BlobDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.playerDetails$ = this.playerService.getCurrentPlayer();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PlayerInfoModalComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.playerService.currentPlayer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const cropperImageName =
          Math.floor(Math.random() * 2000).toString() + ".jpg";
        if (result.picture.url.includes(";base64")) {
          this.blobDataService
            .addBase64Image(result.picture.url, cropperImageName)
            .pipe(
              switchMap((data) => {
                result.picture = data;
                return this.playerService.savePlayerDetails(result);
              })
            )
            .subscribe(
              (x) => {
                this.playerService.setCurrentPlayer(result);
                this.openSnackBar("Player details successfully saved", "close");
              },
              (err: any) => {}
            );
        } else {
          this.playerService.savePlayerDetails(result).subscribe(
            (x) => {
              this.playerService.setCurrentPlayer(result);
              this.openSnackBar("Player details successfully saved", "close");
            },
            (err: any) => {}
          );
        }
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ["custom-class"];
    config.duration = 3000;
    config.horizontalPosition = "right";
    this.snackBar.open(message, null, config);
  }
}
