import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service'; 

@Component({
  selector: 'app-competition-overview',
  templateUrl: './competition-overview.component.html',
  styleUrls: ['./competition-overview.component.scss']
})
export class CompetitionOverviewComponent implements OnInit {

  public competitionList: Array<any>;
   
    constructor(private _competitionService : CompetitionService) { 
  
    }
  
    ngOnInit() {
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

