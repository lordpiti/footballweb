import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionInfoModalComponent } from './competition-info-modal.component';

describe('CompetitionInfoModalComponent', () => {
  let component: CompetitionInfoModalComponent;
  let fixture: ComponentFixture<CompetitionInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
