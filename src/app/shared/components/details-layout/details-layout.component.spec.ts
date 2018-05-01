import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLayoutComponent } from './details-layout.component';

describe('DetailsLayoutComponent', () => {
  let component: DetailsLayoutComponent;
  let fixture: ComponentFixture<DetailsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
