import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competition-matches',
  templateUrl: './competition-matches.component.html',
  styleUrls: ['./competition-matches.component.scss']
})
export class CompetitionMatchesComponent implements OnInit {

  competitionData: any;

  constructor(private _competitionService: CompetitionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this._competitionService.currentCompetition) {
      this.competitionData = this._competitionService.currentCompetition;
    }

    this._competitionService.getCurrentCompetition().subscribe(data => {
      this.competitionData = data;
    });
  }

}
