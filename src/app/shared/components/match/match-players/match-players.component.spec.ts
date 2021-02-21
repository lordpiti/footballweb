import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { Team } from '../../../interfaces/team.interface';

import { MatchPlayersComponent } from './match-players.component';

describe('MatchPlayersComponent', () => {
  let component: MatchPlayersComponent;
  let fixture: ComponentFixture<MatchPlayersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatchPlayersComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayersComponent);
    component = fixture.componentInstance;
    component.team = { name: 'test' } as Team;
    component.players = [];
    component.matchId = 1;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
