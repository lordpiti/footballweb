import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service'; 
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';

@Component({
  selector: 'app-competition-overview',
  templateUrl: './competition-overview.component.html',
  styleUrls: ['./competition-overview.component.scss']
})
export class CompetitionOverviewComponent implements OnInit {

  public competitionList: Array<any>;
   
    constructor(private _competitionService : CompetitionService, private sharedService: ShareDataService) { 
  
    }
  
    ngOnInit() {
      setTimeout(()=>{
        this.sharedService.setCurrentArea(AppAreas.Competitions);
      },0);
      this._competitionService.getAllCompetitions().subscribe(
        (data: Array<any>) => {
            this.competitionList = data;
            //this.surveyService.setProjectFollowerData(data);
        },
        (err: any) => {
        }
      );
    }

}

