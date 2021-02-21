import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatchService } from '../../services/match.service';

import { MatchPlayerStatisticsComponent } from './match-player-statistics.component';

describe('MatchPlayerStatisticsComponent', () => {
  let component: MatchPlayerStatisticsComponent;
  let fixture: ComponentFixture<MatchPlayerStatisticsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatchPlayerStatisticsComponent],
        providers: [HttpClient, HttpHandler, MatchService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
