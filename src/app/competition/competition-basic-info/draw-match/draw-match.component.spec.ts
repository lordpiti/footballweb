import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Match } from '../../../shared/interfaces/match.interface';
import { DrawMatchComponent } from './draw-match.component';

describe('DrawMatchComponent', () => {
  let component: DrawMatchComponent;
  let fixture: ComponentFixture<DrawMatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DrawMatchComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawMatchComponent);
    component = fixture.componentInstance;
    component.competitionData = { id: 1 };
    component.match = {
      matchId: 1,
      goalsLocal: 1,
      goalsVisitor: 1,
      localTeam: {
        id: 1,
        name: '',
        pictureLogo: {
          url: '',
        },
        playerList: [],
        stadium: null,
        city: null,
      },
      visitorTeam: {
        id: 2,
        name: '',
        pictureLogo: {
          url: '',
        },
        playerList: [],
        stadium: null,
        city: null,
      },
    } as Match;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
