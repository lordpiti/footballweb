import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-news',
  templateUrl: './team-news.component.html',
  styleUrls: ['./team-news.component.scss']
})
export class TeamNewsComponent implements OnInit {

  constructor(private _teamService: TeamService) { 

  }

  feedUrl: string;

  ngOnInit() {

    if (this._teamService.currentTeam) {
      this.feedUrl = this.getFeedUrl(this._teamService.currentTeam.name);
    }

    this._teamService.getCurrentTeam().subscribe(team => {     
      this.feedUrl = this.getFeedUrl(team.name);
    })
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
