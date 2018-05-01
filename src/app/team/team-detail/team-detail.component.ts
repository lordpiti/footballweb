import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';
import { NgForm } from '@angular/forms';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../../../environments/environment';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { Subscription } from 'rxjs';
import { AppAreas } from '../../shared/enums/app-areas';
import { DetailsMenuData } from '../../shared/interfaces/details-menu-data.interface';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  // public config: DropzoneConfigInterface = {
  //   url: environment.api_url+'globalmedia/UploadDocument',
  //   maxFilesize: 50,
  //   acceptedFiles: 'image/*',
  //   paramName: 'files'
  // };

  public teamDetails: Team;
  public teamDetailsMenuData: DetailsMenuData;

  @Input() newid: number = null;

  // busy: Subscription;

  constructor(private router: Router, private _teamService: TeamService,
    private route: ActivatedRoute, public modal: Modal,
    private modalCropperService: ShareDataService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
      this.teamDetails = { name: '', id: 0, playerList: [], pictureLogo: {}, stadium: {}, city: null };
  }


  ngOnInit() {

    // Use observables here because the team data lives on a service,
    // and that's being modified via other components. We only want
    // the data to be updated in this component when the data in the
    // service changes
    this._teamService.getCurrentTeam().subscribe(data => {
      this.teamDetails = data;
      this.teamDetailsMenuData = {
        title: data.name,
        imageUrl: data.pictureLogo,
        entityName: 'Teams',
        itemsList: [
          {
            title: 'Summary',
            link: 'summary'
          },
          {
            title: 'Squad',
            link: 'squad'
          },
          {
            title: 'Competitions',
            link: 'competitions'
          },
          {
            title: 'News',
            link: 'news'
          }
        ],
        dataLoaded: true
      };
    });

    if (!this.newid) {
      // let id = this.route.snapshot.params['id'];

      this.route.params.subscribe(params => {
        this.newid = +params['id']; // (+) converts string 'id' to a number

        this.getData(this.newid);
      });

    } else {
      this.getData(this.newid);
    }
  }

  private getData(id: number): void {
    this._teamService.getTeamDetails(id).subscribe(
      (teamData: Team) => {
          this._teamService.setCurrentTeam(teamData);
      },
      (err: any) => {
      }
    );
  }
}
