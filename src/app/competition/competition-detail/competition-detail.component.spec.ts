import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { CompetitionService } from '../competition.service';

import { CompetitionDetailComponent } from './competition-detail.component';

describe('CompetitionDetailComponent', () => {
  let component: CompetitionDetailComponent;
  let fixture: ComponentFixture<CompetitionDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionDetailComponent],
        providers: [
          HttpHandler,
          HttpClient,
          CompetitionService,
          ShareDataService,
          {
            provide: ActivatedRoute,
            useValue: {
              params: Observable.from([{ id: 1 }]),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
