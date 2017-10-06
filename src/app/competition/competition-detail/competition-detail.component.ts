import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {

  public competitionDetails: any;

  constructor(private router: Router,private _competitionService: CompetitionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let competitionId = +params['id']; // (+) converts string 'id' to a number

      this._competitionService.getCompetitionDetails(competitionId).subscribe(
        (competitionData: any) => {
            this.competitionDetails = competitionData;
            this._competitionService.setCurrentCompetition(competitionData);
        },
        (err: any) => {
        }
      );
    });
  }

}
