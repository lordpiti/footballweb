import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayersComponent } from './match-players.component';

describe('MatchPlayersComponent', () => {
  let component: MatchPlayersComponent;
  let fixture: ComponentFixture<MatchPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
