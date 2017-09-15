import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionBasicInfoComponent } from './competition-basic-info.component';

describe('CompetitionBasicInfoComponent', () => {
  let component: CompetitionBasicInfoComponent;
  let fixture: ComponentFixture<CompetitionBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
