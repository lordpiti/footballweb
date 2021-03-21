import { Component, OnInit } from '@angular/core';
import { Competition } from '../../shared/interfaces/competition.interface';
import { CompetitionService } from '../competition.service';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { switchMap } from 'rxjs/operators';
import { CompetitionInfoModalComponent } from './competition-info-modal/competition-info-modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-competition-summary',
  templateUrl: './competition-summary.component.html',
  styleUrls: ['./competition-summary.component.scss'],
})
export class CompetitionSummaryComponent implements OnInit {
  competitionDetails$: Observable<Competition> = null;

  constructor(
    public competitionService: CompetitionService,
    private blobDataService: BlobDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.competitionDetails$ = this.competitionService.getCurrentCompetition();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompetitionInfoModalComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.competitionService.currentCompetition,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.file) {
          this.blobDataService
            .saveDocument(result.file)
            .pipe(
              switchMap((data) => {
                result.logo = data;
                return this.competitionService.saveCompetitionDetails(result);
              })
            )
            .subscribe(
              (x) => {
                this.competitionService.setCurrentCompetition(result);
                this.openSnackBar(
                  'Competition details successfully saved',
                  'close'
                );
              },
              (err: any) => {}
            );
        } else {
          this.competitionService.saveCompetitionDetails(result).subscribe(
            (x) => {
              this.competitionService.setCurrentCompetition(result);
              this.openSnackBar(
                'Competition details successfully saved',
                'close'
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
    config.panelClass = ['custom-class'];
    config.duration = 3000;
    config.horizontalPosition = 'right';
    this.snackBar.open(message, null, config);
  }
}
