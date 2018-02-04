import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNgrxComponent } from './test-ngrx.component';

describe('TestNgrxComponent', () => {
  let component: TestNgrxComponent;
  let fixture: ComponentFixture<TestNgrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNgrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
