import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TeamService } from '../team.service';

import { TeamNewsComponent } from './team-news.component';

describe('TeamNewsComponent', () => {
  let component: TeamNewsComponent;
  let fixture: ComponentFixture<TeamNewsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TeamNewsComponent],
        providers: [HttpClient, HttpHandler, TeamService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
