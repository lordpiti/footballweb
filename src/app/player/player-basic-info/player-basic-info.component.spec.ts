import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBasicInfoComponent } from './player-basic-info.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { PlayerService } from '../player.service';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CustomFormInputComponent } from '../../shared/components/custom-form-input/custom-form-input.component';
import { CustomFormSelectComponent } from '../../shared/components/custom-form-select/custom-form-select.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Injectable()
export class ActivatedRouteStub {
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }
}

export class ToastManagerStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
      this._testParams = params;
      this.subject.next(params);
  }

  setRootViewContainerRef(hehe: any) {

  }

  success(texto: string) {

  }
}

export class ViewContainerRefStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
      this._testParams = params;
      this.subject.next(params);
  }
}

fdescribe('PlayerBasicInfoComponent', () => {
  let component: PlayerBasicInfoComponent;
  let fixture: ComponentFixture<PlayerBasicInfoComponent>;
  let mockActivatedRoute, mockToastManager, mockViewContainerRef;
  const playerMock = {
    name: 'jaja',
    surname: 'zeta',
    teamName: '',
    dorsal: 2,
    teamId: 2,
    playerId: 4,
    position: 'Striker'
  };

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();
    mockToastManager = new ToastManagerStub();
    mockViewContainerRef = new ViewContainerRefStub();

    TestBed.configureTestingModule({
      imports: [    CommonModule,
        FormsModule,
        ReactiveFormsModule, SharedModule],
      declarations: [ PlayerBasicInfoComponent ],
      providers: [
        HttpHandler,
        HttpClient,
        PlayerService,
        ToastsManager,
        ViewContainerRef,
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: ToastsManager, useValue: mockToastManager},
        {provide: ViewContainerRef, useValue: mockViewContainerRef}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

      fixture = TestBed.createComponent(PlayerBasicInfoComponent);
      component = fixture.componentInstance;
      component.playerDetails = playerMock;
      fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should save changes properly', () => {

    const testForm = <NgForm>{
      value: {
          name: 'Hello',
          category: 'World'
      },
      valid: true
    };

    const jejejeje = Observable.of(new Object()).mapTo(true);
    const currentPlayer = Observable.of(new Object()).mapTo(playerMock);

    spyOn(testForm, 'valid').and.returnValue(true);
    spyOn(component.playerService, 'getCurrentPlayer').and.returnValue(currentPlayer);
    spyOn(component.playerService, 'savePlayerDetails').and.returnValue(jejejeje);
    spyOn(component.toastr, 'success');

    component.savePlayerDetails(playerMock, testForm);
    expect(component.playerService.savePlayerDetails).toHaveBeenCalledWith(playerMock);
    expect(component.toastr.success).toHaveBeenCalled();

    expect(component).toBeTruthy();
  });
});
