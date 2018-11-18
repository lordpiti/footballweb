import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNewsComponent } from './team-news.component';

describe('TeamNewsComponent', () => {
  let component: TeamNewsComponent;
  let fixture: ComponentFixture<TeamNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
