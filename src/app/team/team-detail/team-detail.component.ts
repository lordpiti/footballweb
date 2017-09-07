import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public teamDetails: Team;
  private data: any;
  private cropperSettings: CropperSettings;

  @Input() newid: number = null;

  constructor(private router: Router, private _teamService: TeamService, 
    private route: ActivatedRoute){
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 100;
      this.cropperSettings.height = 100;
      this.cropperSettings.croppedWidth =100;
      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.canvasWidth = 400;
      this.cropperSettings.canvasHeight = 300;

      this.data = {};
  }


  ngOnInit() {
    if (!this.newid){
      //let id = this.route.snapshot.params['id'];

      this.route.params.subscribe(params => {
        this.newid = +params['id']; // (+) converts string 'id' to a number

        this.getData(this.newid);
      });
    }
    else{
      this.getData(this.newid);
    }
  }

  ngOnChanges(changes:any){
    this.getData(changes.newid.currentValue);
  }

  hahaha(){
    this._teamService.addBase64Image(this.data.image, 'testTeam.jpg').subscribe(
      (data: any) => {
        console.log(this.data);
      },
      (err: any) => {
      }
    );
  }

  updatePicture(){
    this._teamService.updateTeamImage(this.newid, { FileName: 'testTeam.jpg' } ).subscribe(
      (data: any) => {
        console.log(this.data);
      },
      (err: any) => {
      }
    );
  }

  private getData(id: number):void{
    // In a real app: dispatch action to load the details here.
    this._teamService.getTeamDetails(id).subscribe(
      (data: Team) => {
          this.teamDetails = data;
          //this.surveyService.setProjectFollowerData(data);
      },
      (err: any) => {
      }
    );
  }
}
