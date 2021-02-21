import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetitionService } from '../competition.service';

import { CompetitionTeamsComponent } from './competition-teams.component';

describe('CompetitionTeamsComponent', () => {
  let component: CompetitionTeamsComponent;
  let fixture: ComponentFixture<CompetitionTeamsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionTeamsComponent],
        providers: [HttpClient, HttpHandler, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
