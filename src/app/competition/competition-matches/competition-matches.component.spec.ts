/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompetitionMatchesComponent } from './competition-matches.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CompetitionService } from '../competition.service';

describe('CompetitionMatchesComponent', () => {
  let component: CompetitionMatchesComponent;
  let fixture: ComponentFixture<CompetitionMatchesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionMatchesComponent],
        providers: [HttpHandler, HttpClient, CompetitionService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
