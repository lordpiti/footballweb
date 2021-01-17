import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { DetailsMenuData } from '../../shared/interfaces/details-menu-data.interface';
import { Competition } from '../../shared/interfaces/competition.interface';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss'],
})
export class CompetitionDetailComponent implements OnInit {
  public competitionDetails: Competition;
  public competitionDetailsMenuData: DetailsMenuData;

  constructor(
    private router: Router,
    private _competitionService: CompetitionService,
    private sharedService: ShareDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Competitions);
    }, 0);

    // Use observables here because the team data lives on a service,
    // and that's being modified via other components. We only want
    // the data to be updated in this component when the data in the
    // service changes
    this._competitionService.getCurrentCompetition().subscribe(
      (competitionData: Competition) => {
        if (competitionData) {
          this.competitionDetails = Object.assign({}, competitionData);
          this.competitionDetailsMenuData = {
            title: this.competitionDetails.name,
            imageUrl: this.competitionDetails.logo.url,
            entityName: 'Competitions',
            itemsList: [
              {
                title: 'Summary',
                link: 'summary',
              },
              {
                title: 'Rounds',
                link: 'rounds',
              },
              {
                title: 'Teams',
                link: 'teams',
              },
            ],
            dataLoaded: true,
          };
        }
      },
      (err: any) => {}
    );

    this.route.params.subscribe((params) => {
      const competitionId = +params['id']; // (+) converts string 'id' to a number

      this.getData(competitionId);
    });
  }

  private getData(id: number): void {
    this._competitionService.getCompetitionDetails(id).subscribe(
      (competitionData: Competition) => {
        this._competitionService.setCurrentCompetition(competitionData);
      },
      (err: any) => {}
    );
  }
}
