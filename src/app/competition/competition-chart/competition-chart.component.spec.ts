import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetitionService } from '../competition.service';

import { CompetitionChartComponent } from './competition-chart.component';

describe('CompetitionChartComponent', () => {
  let component: CompetitionChartComponent;
  let fixture: ComponentFixture<CompetitionChartComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionChartComponent],
        providers: [HttpClient, HttpHandler, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
