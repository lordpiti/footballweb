import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rssFeedUrl = environment.home_rss_feed_url;

  constructor() { }

  ngOnInit() {
  }

}
