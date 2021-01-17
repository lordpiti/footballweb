import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  public matchDetails$: Observable<any>;
  public matchId: number;

  constructor(
    private router: Router,
    private _matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.matchId = +params['id']; // (+) converts string 'id' to a number
      this.matchDetails$ = this._matchService.getMatch(this.matchId);
    });
  }
}
