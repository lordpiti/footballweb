import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionRoundComponent } from './competition-round.component';

describe('CompetitionRoundComponent', () => {
  let component: CompetitionRoundComponent;
  let fixture: ComponentFixture<CompetitionRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
