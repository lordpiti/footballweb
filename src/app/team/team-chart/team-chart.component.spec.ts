import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamService } from '../team.service';

import { TeamChartComponent } from './team-chart.component';

describe('TeamChartComponent', () => {
  let component: TeamChartComponent;
  let fixture: ComponentFixture<TeamChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamChartComponent],
      providers: [HttpClient, HttpHandler, TeamService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
