import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {

  public competitionDetails: any;

  constructor(private router: Router, private _competitionService: CompetitionService,
    private sharedService: ShareDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Competitions);
    }, 0);

    this.route.params.subscribe(params => {
      const competitionId = +params['id']; // (+) converts string 'id' to a number

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
