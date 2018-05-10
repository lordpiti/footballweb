import { Component, OnInit } from '@angular/core';
import { Competition } from '../../shared/interfaces/competition.interface';
import { NgForm } from '@angular/forms';
import { CompetitionService } from '../competition.service';
import { CropperPictureDialogComponent } from '../../shared/components/cropper-picture-dialog/cropper-picture-dialog.component';
import { MatDialog } from '@angular/material';
import { BlobDataService } from '../../shared/services/blob-data.service';

@Component({
  selector: 'app-competition-summary',
  templateUrl: './competition-summary.component.html',
  styleUrls: ['./competition-summary.component.scss']
})
export class CompetitionSummaryComponent implements OnInit {

  competitionDetails: Competition = null;

  constructor(private competitionService: CompetitionService, private blobDataService: BlobDataService, public dialog: MatDialog) { }

  ngOnInit() {

    if (this.competitionService.currentCompetition) {
      this.competitionDetails = this.competitionService.currentCompetition;
    }

    this.competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionDetails = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CropperPictureDialogComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.competitionDetails.logo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result) {
        this.competitionDetails.logo.url = result;
      }
    });
  }

  saveCompetitionDetails(competition: Competition, form: NgForm) {

    const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

    if (this.competitionDetails.logo.url.includes(';base64')) {
      this.blobDataService.addBase64Image(this.competitionDetails.logo.url, cropperImageName)
      .switchMap(data => {
          competition.logo = data;
          return this.competitionService.savePlayerDetails(competition);
      }).subscribe( x => {
        this.competitionService.setCurrentCompetition(competition);
        alert('Competition details successfully saved');
      },
      (err: any) => {});
    } else {
      this.competitionService.savePlayerDetails(competition).subscribe( x => {
        alert('Competition details successfully saved');
      },
      (err: any) => {});
    }

  }

}
