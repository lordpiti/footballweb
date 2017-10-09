import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayersSingleComponent } from './match-players-single.component';

describe('MatchPlayersSingleComponent', () => {
  let component: MatchPlayersSingleComponent;
  let fixture: ComponentFixture<MatchPlayersSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayersSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayersSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
