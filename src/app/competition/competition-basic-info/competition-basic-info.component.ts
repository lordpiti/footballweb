import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competition-basic-info',
  templateUrl: './competition-basic-info.component.html',
  styleUrls: ['./competition-basic-info.component.scss']
})
export class CompetitionBasicInfoComponent implements OnInit {

  constructor(private _competitionService: CompetitionService, private route: ActivatedRoute) { }

  public draw: any;
  private _competitionData: any;

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      const competitionId = +params['id']; // (+) converts string 'id' to a number

      this.loadDraw(competitionId);
    });
  }

  loadDraw(competitionId: number) {
    this._competitionService.getCompetitionDraw(competitionId).subscribe(
      (competitionDraw: any) => {
          this.draw = competitionDraw;
      },
      (err: any) => {
      }
    );
  }

}
