import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionOverviewComponent } from './competition-overview.component';

describe('CompetitionOverviewComponent', () => {
  let component: CompetitionOverviewComponent;
  let fixture: ComponentFixture<CompetitionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
