import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsEditModalWindowData } from './team-edit-modal.component';

describe('TeamEditModalComponent', () => {
  let component: TeamDetailsEditModalWindowData;
  let fixture: ComponentFixture<TeamDetailsEditModalWindowData>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailsEditModalWindowData ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailsEditModalWindowData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
