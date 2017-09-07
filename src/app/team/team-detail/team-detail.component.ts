import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public teamDetails: Team;

  @Input() newid: number = null;

  constructor(private router: Router, private _teamService: TeamService, 
    private route: ActivatedRoute, public modal: Modal){
      this.teamDetails = { Name:"", Id: 0, PlayerList:[], PictureUrl:""};
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

  showModalEvent(team: Team) {
    this.modal.open(TeamDetailsEditModalComponent, overlayConfigFactory({ teamDetails: team }, BSModalContext));
  }

  saveTeamDetails(team: Team, form: NgForm){
    
    if (form.valid){
      this._teamService.saveTeamDetails(team).subscribe(
        (data: boolean) => {
            console.log(data);
        },
        (err: any) => {
        }
      );
    }
  }

  private getData(id: number):void{
    // In a real app: dispatch action to load the details here.
    this._teamService.getTeamDetails(id).subscribe(
      (data: Team) => {
          this.teamDetails = data;
          console.log(this.teamDetails);
          //this.surveyService.setProjectFollowerData(data);
      },
      (err: any) => {
      }
    );
  }
}
