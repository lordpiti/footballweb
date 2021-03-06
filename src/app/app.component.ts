import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './shared/services/shared-data.service';
import { AppAreas } from './shared/enums/app-areas';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public appArea: AppAreas;
  public loggedIn = false;
  private dialogRef: MatDialogRef<LoadingSpinnerComponent>;

  constructor(
    private sharedService: ShareDataService,
    // private externalService: SampleService,
    private dialog: MatDialog
  ) {
    this.sharedService.setCurrentArea(AppAreas.Start);
    // this.externalService.testMethod();
  }

  ngOnInit() {
    this.sharedService.getCurrentArea().subscribe((data) => {
      this.appArea = data;
    });

    this.sharedService.getData().subscribe((data) => {
      setTimeout(() => {
        if (data === true) {
          this.dialogRef = this.dialog.open(LoadingSpinnerComponent, {
            panelClass: 'transparent',
            disableClose: true,
          });
        } else {
          if (this.dialogRef) this.dialogRef.close();
        }
      });
    });
  }
}
