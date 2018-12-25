import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoModalComponent } from './player-info-modal.component';

describe('PlayerInfoModalComponent', () => {
  let component: PlayerInfoModalComponent;
  let fixture: ComponentFixture<PlayerInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
