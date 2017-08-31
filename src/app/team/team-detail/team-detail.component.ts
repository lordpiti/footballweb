import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/interfaces/team.interface';
import { TeamService} from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  private _id: number;
  public teamDetails: Team;
  constructor(private router: Router, private _teamService: TeamService, 
    private route: ActivatedRoute){

  }


  ngOnInit() {
    //let id = this.route.snapshot.params['id'];

    this.route.params.subscribe(params => {
      this._id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this._teamService.getTeamDetails(this._id).subscribe(
        (data: Team) => {
            this.teamDetails = data;
            console.log(data);
            //this.surveyService.setProjectFollowerData(data);
        },
        (err: any) => {
        }
    );
   });
  }
}
