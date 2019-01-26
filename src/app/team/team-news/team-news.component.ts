import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Store } from '@ngrx/store';
import { Team } from '../../shared/interfaces/team.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-news',
  templateUrl: './team-news.component.html',
  styleUrls: ['./team-news.component.scss']
})
export class TeamNewsComponent implements OnInit {

  constructor(private _teamService: TeamService, private store: Store<{ team:{
    current: Team,
    loadingSpinner: boolean
  }  }>) { 

  }

  feedUrl: string;
  teamDetails$: Observable<Team>;

  ngOnInit() {

    this.teamDetails$ = this.store.select(x=>x.team.current);

    this.teamDetails$.subscribe(teamData => {
      if (teamData) {
        this.feedUrl = this.getFeedUrl(teamData.name);
      }
    });
  }

  private getFeedUrl(teamName: string) {
    const urls = [
      'real-madrid',
      'deportivo',
      'betis',
      'barcelona',
      'sevilla',
      'malaga',
      'mallorca',
      'osasuna',
      'athletic',
      'espanyol',
      'villarreal',
      'atletico',
      'valladolid',
      'sporting',
      'numancia',
      'valencia',
      'almeria'
    ];

    const replacedName = teamName.replace(/ /gi, "-").toLowerCase();

    let foundUrl = urls.find(x=> replacedName.includes(x));

    if (!foundUrl) {
        foundUrl = 'deportivo'
    }

    return `https://e00-marca.uecdn.es/rss/futbol/${foundUrl}.xml`;
  }

}
