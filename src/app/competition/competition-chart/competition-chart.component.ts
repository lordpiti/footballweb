import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-competition-chart',
  templateUrl: './competition-chart.component.html',
  styleUrls: ['./competition-chart.component.scss']
})
export class CompetitionChartComponent implements OnInit, OnChanges {

  @Input() teamId: number;
  @Input() competitionId: number;

  constructor(private _competitionService: CompetitionService) {
  }

   // lineChart
   public lineChartData: Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      // This is to use straight lines
      lineTension: 0
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      lineTension: 0
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      lineTension: 0
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this._loadChartData(this.teamId, this.competitionId);
  }

  ngOnChanges(data: any) {

    // Best way to do this would be using a service and observables
    if (data.teamId.previousValue !== data.teamId.currentValue) {
      this._loadChartData(this.teamId, this.competitionId);
    }
  }

  private _loadChartData(teamId: number, competitionId: number) {
    this._competitionService.getChartDataTeamCompetition(teamId, competitionId).subscribe(
      (data: any) => {
        this.lineChartData = [];
        this.lineChartData.push(data.positions),
        this.lineChartData.push(data.goalsForList),
        this.lineChartData.push(data.goalsAgainstList);

        this.lineChartLabels = data.roundList;
      },
      (err: any) => {
      }
    );
  }


}
