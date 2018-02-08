import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormSelectComponent } from './custom-form-select.component';

describe('CustomFormSelectComponent', () => {
  let component: CustomFormSelectComponent;
  let fixture: ComponentFixture<CustomFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
