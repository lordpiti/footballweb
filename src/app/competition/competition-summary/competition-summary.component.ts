import { Component, OnInit } from "@angular/core";
import { Competition } from "../../shared/interfaces/competition.interface";
import { CompetitionService } from "../competition.service";
import { BlobDataService } from "../../shared/services/blob-data.service";
import { switchMap } from "rxjs/operators";
import { CompetitionInfoModalComponent } from "./competition-info-modal/competition-info-modal.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-competition-summary",
  templateUrl: "./competition-summary.component.html",
  styleUrls: ["./competition-summary.component.scss"],
})
export class CompetitionSummaryComponent implements OnInit {
  competitionDetails: Competition = null;

  // constructor(private competitionService: CompetitionService, private blobDataService: BlobDataService, public dialog: MatDialog) { }

  // ngOnInit() {

  //   if (this.competitionService.currentCompetition) {
  //     this.competitionDetails = this.competitionService.currentCompetition;
  //   }

  //   this.competitionService.getCurrentCompetition().subscribe(data => {
  //     this.competitionDetails = data;
  //   });
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(CropperPictureDialogComponent, {
  //     // width: '550px',
  //     // minHeight: '600px';
  //     data: this.competitionDetails.logo
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //     if (result) {
  //       this.competitionDetails.logo.url = result;
  //     }
  //   });
  // }

  // saveCompetitionDetails(competition: Competition, form: NgForm) {

  //   const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

  //   if (this.competitionDetails.logo.url.includes(';base64')) {
  //     this.blobDataService.addBase64Image(this.competitionDetails.logo.url, cropperImageName)
  //     .pipe(switchMap(data => {
  //         competition.logo = data;
  //         return this.competitionService.savePlayerDetails(competition);
  //     })).subscribe( x => {
  //       this.competitionService.setCurrentCompetition(competition);
  //       alert('Competition details successfully saved');
  //     },
  //     (err: any) => {});
  //   } else {
  //     this.competitionService.savePlayerDetails(competition).subscribe( x => {
  //       this.competitionService.setCurrentCompetition(competition);
  //       alert('Competition details successfully saved');
  //     },
  //     (err: any) => {});
  //   }

  // }

  constructor(
    public competitionService: CompetitionService,
    private blobDataService: BlobDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.competitionService.currentCompetition) {
      this.competitionDetails = this.competitionService.currentCompetition;
    }

    this.competitionService.getCurrentCompetition().subscribe((data) => {
      this.competitionDetails = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompetitionInfoModalComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.competitionDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.competitionDetails = result;
        const cropperImageName =
          Math.floor(Math.random() * 2000).toString() + ".jpg";
        if (this.competitionDetails.logo.url.includes(";base64")) {
          this.blobDataService
            .addBase64Image(this.competitionDetails.logo.url, cropperImageName)
            .pipe(
              switchMap((data) => {
                result.picture = data;
                return this.competitionService.saveCompetitionDetails(
                  this.competitionDetails
                );
              })
            )
            .subscribe(
              (x) => {
                this.competitionService.setCurrentCompetition(
                  this.competitionDetails
                );
                this.openSnackBar(
                  "Competition details successfully saved",
                  "close"
                );
              },
              (err: any) => {}
            );
        } else {
          this.competitionService
            .saveCompetitionDetails(this.competitionDetails)
            .subscribe(
              (x) => {
                this.competitionService.setCurrentCompetition(
                  this.competitionDetails
                );
                this.openSnackBar(
                  "Competition details successfully saved",
                  "close"
                );
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
