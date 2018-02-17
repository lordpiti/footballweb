import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSimulationMatchComponent } from './competition-simulation-match.component';

describe('CompetitionSimulationMatchComponent', () => {
  let component: CompetitionSimulationMatchComponent;
  let fixture: ComponentFixture<CompetitionSimulationMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionSimulationMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSimulationMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
