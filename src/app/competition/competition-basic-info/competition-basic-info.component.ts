import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competition-basic-info',
  templateUrl: './competition-basic-info.component.html',
  styleUrls: ['./competition-basic-info.component.scss'],
})
export class CompetitionBasicInfoComponent implements OnInit {
  constructor(private _competitionService: CompetitionService) {}

  public draw: any;
  @Input() competitionData: any;

  ngOnInit() {
    this.loadDraw(this.competitionData.id);
  }

  loadDraw(competitionId: number) {
    this._competitionService.getCompetitionDraw(competitionId).subscribe(
      (competitionDraw: any) => {
        this.draw = competitionDraw;
      },
      (err: any) => {}
    );
  }
}
