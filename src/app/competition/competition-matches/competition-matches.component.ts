import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-competition-matches',
  templateUrl: './competition-matches.component.html',
  styleUrls: ['./competition-matches.component.scss'],
})
export class CompetitionMatchesComponent implements OnInit {
  competitionData$: Observable<any>;

  constructor(
    private _competitionService: CompetitionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.competitionData$ = this._competitionService.getCurrentCompetition();
  }
}
