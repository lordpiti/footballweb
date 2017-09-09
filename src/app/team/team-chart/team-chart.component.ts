import { Component, OnInit, Input } from '@angular/core';
import { TeamService} from '../team.service';

@Component({
 selector: 'team-chart',
 templateUrl: './team-chart.component.html'
})
export class TeamChartComponent {

  @Input() teamId: number = null;
  @Input() competitionName: string = null;
  @Input() season: string = null;

  constructor(private _teamService: TeamService){

  }

 // lineChart
  public lineChartData:Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //This is to use straight lines
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
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {
    this.loadChartData(this.teamId, this.competitionName,this.season);
  }

  private loadChartData(teamId: number, competitionName: string, season: string){
    this._teamService.getClasification(teamId, competitionName,season).subscribe(
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

  ngOnChanges(changes:any){
    console.log(changes);
    this.loadChartData(this.teamId, this.competitionName, changes.season.currentValue);
  }
}