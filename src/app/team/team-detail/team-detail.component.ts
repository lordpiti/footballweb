import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';
import { NgForm } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: environment.api_url+'globalmedia/UploadDocument',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    paramName: 'files'
  };

  public teamDetails: Team;
  public competitions: any;
  public seasons: any;

  public selectedCompetition:string;
  public selectedSeason: string;

  @Input() newid: number = null;

  constructor(private router: Router, private _teamService: TeamService, 
    private route: ActivatedRoute, public modal: Modal){
      this.teamDetails = { name:"", id: 0, playerList:[], pictureLogo: {}};
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

  onUploadError($event){
  }
    
  onUploadSuccess($event){

  }

  onChangeCompetition(competitionName: string){
    this.seasons = this.competitions.filter(x=>x.competitionName == competitionName).map(x=>x.season);
    this.selectedCompetition = competitionName;
    this.onChangeSeason(this.seasons[0]);
  }

  onChangeSeason(season:string){
    this.selectedSeason = season;
  }

  private getData(id: number):void{
    this._teamService.getTeamDetails(id).subscribe(
      (teamData: Team) => {
          this.teamDetails = teamData;
          this._teamService.getTeamCompetitions(id).subscribe(
            (competitionsData: any) => {
                this.competitions = competitionsData.filter(x=>x.type=="Liga");
                if (this.competitions.length>0){
                  this.onChangeCompetition(this.competitions[0].competitionName);
                }
            },
            (err: any) => {
            }
          );
      },
      (err: any) => {
      }
    );
  }
}
