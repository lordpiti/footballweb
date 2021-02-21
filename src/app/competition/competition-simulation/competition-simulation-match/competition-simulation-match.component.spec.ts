import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetitionService } from '../../competition.service';

import { CompetitionSimulationMatchComponent } from './competition-simulation-match.component';

describe('CompetitionSimulationMatchComponent', () => {
  let component: CompetitionSimulationMatchComponent;
  let fixture: ComponentFixture<CompetitionSimulationMatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionSimulationMatchComponent],
        providers: [HttpClient, HttpHandler, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSimulationMatchComponent);
    component = fixture.componentInstance;
    component.match = { local: 1, visitor: 2 } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
