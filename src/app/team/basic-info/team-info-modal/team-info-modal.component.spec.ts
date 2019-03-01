import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInfoModalComponent } from './team-info-modal.component';

describe('TeamInfoModalComponent', () => {
  let component: TeamInfoModalComponent;
  let fixture: ComponentFixture<TeamInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
