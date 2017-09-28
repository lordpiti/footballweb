import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';
import { NgForm } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../../../environments/environment';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    url: environment.api_url+'globalmedia/UploadDocument',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    paramName: 'files'
  };

  public teamDetails: Team;

  public teamLogo: any;

  @Input() newid: number = null;

  busy: Subscription;

  constructor(private router: Router, private _teamService: TeamService, 
    private route: ActivatedRoute, public modal: Modal,
    private modalCropperService: ShareDataService,
    public toastr: ToastsManager, vcr: ViewContainerRef){
      this.toastr.setRootViewContainerRef(vcr);
      this.teamDetails = { name:"", id: 0, playerList:[], pictureLogo: {}};
  }


  ngOnInit() {

    if (!this.newid){
      //let id = this.route.snapshot.params['id'];

      this.route.params.subscribe(params => {
        this.newid = +params['id']; // (+) converts string 'id' to a number

        this.getData(this.newid);

        this.modalCropperService.getData().subscribe((media: any) => {
          this.teamLogo = media;
        });
      });
    }
    else{
      this.getData(this.newid);
    }
  }
  

  ngOnChanges(changes:any){
    this.getData(changes.newid.currentValue);
  }

  showModalEvent(team: Team) {
    this.modal.open(TeamDetailsEditModalComponent, 
      overlayConfigFactory({ teamDetails: team }, BSModalContext));
  }

  saveTeamDetails(team: Team, form: NgForm){
    
    if (form.valid){
      team.pictureLogo = this.teamLogo;
      this._teamService.saveTeamDetails(team).subscribe(
        (data: boolean) => {
          this.toastr.success('Team details successfully saved', 'Success!');
        },
        (err: any) => {
        }
      );
    }
  }

  onUploadError($event){
  }
    
  onUploadSuccess($event){

  }

  private getData(id: number):void{
    this.busy = this._teamService.getTeamDetails(id).subscribe(
      (teamData: Team) => {
          this.teamDetails = teamData;
          this._teamService.setCurrentTeam(teamData);
          this.teamLogo = teamData.pictureLogo;
      },
      (err: any) => {
      }
    );
  }
}
