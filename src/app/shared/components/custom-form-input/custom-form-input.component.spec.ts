import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormInputComponent } from './custom-form-input.component';

describe('CustomFormInputComponent', () => {
  let component: CustomFormInputComponent;
  let fixture: ComponentFixture<CustomFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
