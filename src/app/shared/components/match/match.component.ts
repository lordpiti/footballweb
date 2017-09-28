import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  public matchDetails:any;
  private _matchId: number;

  constructor(private router: Router, private _matchService: MatchService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._matchId = +params['id']; // (+) converts string 'id' to a number

      this.getData(this._matchId);

    });
  }

  private getData(id: number):void{
    this._matchService.getMatch(id).subscribe(
      (matchData: any) => {
          this.matchDetails = matchData;
      },
      (err: any) => {
      }
    );
  }

}
