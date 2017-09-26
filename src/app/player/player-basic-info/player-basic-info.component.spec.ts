import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBasicInfoComponent } from './player-basic-info.component';

describe('PlayerBasicInfoComponent', () => {
  let component: PlayerBasicInfoComponent;
  let fixture: ComponentFixture<PlayerBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
