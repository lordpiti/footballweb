import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { CompetitionService } from '../competition.service';

import { CompetitionRoundComponent } from './competition-round.component';

describe('CompetitionRoundComponent', () => {
  let component: CompetitionRoundComponent;
  let fixture: ComponentFixture<CompetitionRoundComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionRoundComponent],
        providers: [HttpClient, HttpHandler, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionRoundComponent);
    component = fixture.componentInstance;
    component.competitionData = { id: 1 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
