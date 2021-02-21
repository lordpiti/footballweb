/* tslint:disable:no-unused-variable */

import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { ShareDataService } from './shared/services/shared-data.service';

describe('AppComponent', () => {
  class MatDialogStub {
    open() {
      return {
        afterClosed: () => Observable.of({}),
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AppComponent],
      providers: [
        ShareDataService,
        { provide: MatDialog, useClass: MatDialogStub },
      ],
    });
    TestBed.compileComponents();
  });

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
