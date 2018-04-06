import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewNgrxComponent } from './overview-ngrx.component';

describe('OverviewNgrxComponent', () => {
  let component: OverviewNgrxComponent;
  let fixture: ComponentFixture<OverviewNgrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewNgrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
