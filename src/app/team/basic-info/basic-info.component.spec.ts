import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TeamActions } from '../../core/actions/teamAction';
import { Team } from '../../shared/interfaces/team.interface';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { GooglemapsService } from '../googlemaps.service';

import { BasicInfoComponent } from './basic-info.component';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
  let store: MockStore;
  const initialState = {
    team: {
      current: {
        id: 1,
        playerList: [],
        name: '',
        pictureLogo: '',
        stadium: null,
        city: '',
      } as Team,
      loadingSpinner: false,
    },
  };

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
        declarations: [BasicInfoComponent],
        providers: [
          HttpClient,
          HttpHandler,
          ShareDataService,
          GooglemapsService,
          TeamActions,
          provideMockStore({ initialState }),
          { provide: MatDialog, useClass: MatDialogStub },
          { provide: MatSnackBar, useClass: MatSnackBarStub },
        ],
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
