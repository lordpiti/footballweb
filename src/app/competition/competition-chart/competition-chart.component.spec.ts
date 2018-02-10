import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionChartComponent } from './competition-chart.component';

describe('CompetitionChartComponent', () => {
  let component: CompetitionChartComponent;
  let fixture: ComponentFixture<CompetitionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
