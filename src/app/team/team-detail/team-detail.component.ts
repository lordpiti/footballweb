import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { Team } from '../../shared/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { DetailsMenuData } from '../../shared/interfaces/details-menu-data.interface';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../core/actions/teamAction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public teamDetails: Team;
  public teamDetailsMenuData: DetailsMenuData;
  private teamDetails$: Observable<Team>;

  constructor(private router: Router, private _teamService: TeamService, private sharedService: ShareDataService,
    private store: Store<{ team:{
      current: Team,
      loadingSpinner: boolean
    }  }>,
    private teamActions: TeamActions,
    private route: ActivatedRoute, public modal: Modal, vcr: ViewContainerRef) {
      this.teamDetails = { name: '', id: 0, playerList: [], pictureLogo: {}, stadium: {}, city: null };
  }


  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Teams);
    }, 0);

    this.route.params.subscribe(params => {
      const teamId = +params['id']; // (+) converts string 'id' to a number

      this.store.dispatch(this.teamActions.loadTeamDetails(teamId));
    });

    this.teamDetails$ = this.store.select(x=>x.team.current);

    this.teamDetails$.subscribe(data => {
      if (data) {
        this.teamDetails = Object.assign({}, data);
        this.teamDetailsMenuData = {
          title: this.teamDetails.name,
          imageUrl: this.teamDetails.pictureLogo.url,
          entityName: 'Teams',
          itemsList: [
            {
              title: 'News',
              link: 'team-news'
            },
            {
              title: 'Summary',
              link: 'summary'
            },
            {
              title: 'Squad',
              link: 'squad'
            },
            // {
            //   title: 'Competitions',
            //   link: 'competitions'
            // }
          ],
          dataLoaded: true
        };
      }

    });
  }
}
