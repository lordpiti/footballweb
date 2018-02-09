import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSimulationComponent } from './competition-simulation.component';

describe('PlayerStatisticsComponent', () => {
  let component: CompetitionSimulationComponent;
  let fixture: ComponentFixture<CompetitionSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
