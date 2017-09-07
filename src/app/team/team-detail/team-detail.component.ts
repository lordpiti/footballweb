import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CropperSettings} from 'ng2-img-cropper';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';

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
    private route: ActivatedRoute, public modal: Modal){
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

  onClick() {
    
    // const dialogRef = this.modal.alert()
    //     .size('lg')
    //     .showClose(true)
    //     .title('A simple Alert style modal window')
    //     .body(`
    //         <h4>Alert is a classic (title/body/footer) 1 button modal window that 
    //         does not block.</h4>
    //         <b>Configuration:</b>
    //         <ul>
    //             <li>Non blocking (click anywhere outside to dismiss)</li>
    //             <li>Size large</li>
    //             <li>Dismissed with default keyboard key (ESC)</li>
    //             <li>Close wth button click</li>
    //             <li>HTML content</li>
    //         </ul>`)
    //     .open();

    //     dialogRef
    //     .then( dialogRef => {
    //         dialogRef.result.then( result => alert(`The result is: ${result}`));
    //       }
    //     );
  }

  showModalEvent(team: Team) {
    this.modal.open(TeamDetailsEditModalComponent, overlayConfigFactory({ teamDetails: team }, BSModalContext));
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
