import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionService } from '../competition.service';

import { CompetitionBasicInfoComponent } from './competition-basic-info.component';

describe('CompetitionBasicInfoComponent', () => {
  let component: CompetitionBasicInfoComponent;
  let fixture: ComponentFixture<CompetitionBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitionBasicInfoComponent],
      providers: [HttpClient, HttpHandler, CompetitionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionBasicInfoComponent);
    component = fixture.componentInstance;
    component.competitionData = { id: 1 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
