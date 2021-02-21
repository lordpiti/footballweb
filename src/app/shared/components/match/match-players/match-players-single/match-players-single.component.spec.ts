import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchPlayersSingleComponent } from './match-players-single.component';

describe('MatchPlayersSingleComponent', () => {
  let component: MatchPlayersSingleComponent;
  let fixture: ComponentFixture<MatchPlayersSingleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatchPlayersSingleComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayersSingleComponent);
    component = fixture.componentInstance;
    component.player = { name: '', surname: '', dorsal: 2 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
