import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { NgForm } from '@angular/forms';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../../../environments/environment';
import { ShareDataService } from '../../shared/services/shared-data.service';
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

  constructor(private router: Router, private _teamService: TeamService, private sharedService: ShareDataService,
    private route: ActivatedRoute, public modal: Modal, vcr: ViewContainerRef) {
      this.teamDetails = { name: '', id: 0, playerList: [], pictureLogo: {}, stadium: {}, city: null };
  }


  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Teams);
    }, 0);

    // Use observables here because the team data lives on a service,
    // and that's being modified via other components. We only want
    // the data to be updated in this component when the data in the
    // service changes
    this._teamService.getCurrentTeam().subscribe(data => {
      this.teamDetails = Object.assign({}, data);
      this.teamDetailsMenuData = {
        title: this.teamDetails.name,
        imageUrl: this.teamDetails.pictureLogo.url,
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

    this.route.params.subscribe(params => {
      const teamId = +params['id']; // (+) converts string 'id' to a number

      this.getData(teamId);
    });

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
