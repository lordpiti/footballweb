import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetitionService } from '../competition.service';

import { CompetitionSimulationComponent } from './competition-simulation.component';

describe('CompetitionSimulationComponent', () => {
  let component: CompetitionSimulationComponent;
  let fixture: ComponentFixture<CompetitionSimulationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionSimulationComponent],
        providers: [HttpClient, HttpHandler, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
