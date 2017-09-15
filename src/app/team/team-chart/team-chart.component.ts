import { Component, OnInit, Input } from '@angular/core';
import { TeamService} from '../team.service';

@Component({
 selector: 'team-chart',
 templateUrl: './team-chart.component.html'
})
export class TeamChartComponent {

  public teamId: number = null;
  public competitions: any;
  public seasons: any;

  public selectedCompetition:string;
  public selectedSeason: string;

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


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {

    //Preguntar como hacer esto solamente con subscribe ... no parece q se pueda
    if (this._teamService.currentTeam){
      this.teamId = this._teamService.currentTeam.id;
      this.loadCompetitions();
      
    }

    this._teamService.getCurrentTeam().subscribe(data => {
      this.teamId = data.id;
      this.loadCompetitions();
    });

  }

  private loadChartData(teamId: number, competitionName: string, season: string){
    this._teamService.getChartData(teamId, competitionName,season).subscribe(
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

  loadCompetitions(){
    this._teamService.getTeamCompetitions(this.teamId).subscribe(
      (competitionsData: any) => {
          this.competitions = competitionsData.filter(x=>x.type=="Liga");
          if (this.competitions.length>0){
            this.onChangeCompetition(this.competitions[0].name);
          }
          debugger;
          this.loadChartData(this.teamId, this.selectedCompetition,this.selectedSeason);
      },
      (err: any) => {
      }
    );
  }

  onChangeCompetition(competitionName: string){
    this.seasons = this.competitions.filter(x=>x.name == competitionName).map(x=>x.season);
    this.selectedCompetition = competitionName;
    this.onChangeSeason(this.seasons[0]);
  }

  onChangeSeason(season:string){
    this.selectedSeason = season;
    this.loadChartData(this.teamId, this.selectedCompetition, this.selectedSeason);
  }

}