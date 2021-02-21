/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetitionSummaryComponent } from './competition-summary.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CompetitionService } from '../competition.service';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CompetitionSummaryComponent', () => {
  let component: CompetitionSummaryComponent;
  let fixture: ComponentFixture<CompetitionSummaryComponent>;

  class MatDialogStub {
    open() {
      return {
        afterClosed: () => Observable.of({}),
      };
    }
  }

  class MatSnackBarStub {
    open() {
      return {
        afterClosed: () => Observable.of({}),
      };
    }
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionSummaryComponent],
        providers: [
          HttpClient,
          HttpHandler,
          CompetitionService,
          BlobDataService,
          { provide: MatDialog, useClass: MatDialogStub },
          { provide: MatSnackBar, useClass: MatSnackBarStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
