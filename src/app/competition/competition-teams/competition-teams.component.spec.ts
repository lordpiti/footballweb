import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTeamsComponent } from './competition-teams.component';

describe('CompetitionTeamsComponent', () => {
  let component: CompetitionTeamsComponent;
  let fixture: ComponentFixture<CompetitionTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
