import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSimulationEventComponent } from './competition-simulation-event.component';

describe('CompetitionSimulationEventComponent', () => {
  let component: CompetitionSimulationEventComponent;
  let fixture: ComponentFixture<CompetitionSimulationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionSimulationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSimulationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
