import { Component, OnInit } from '@angular/core';
import { RssReaderService } from '../../services/rss-reader.service';
import { Item } from '../../interfaces/rss-feed.interface';

@Component({
  selector: 'app-rss-reader',
  templateUrl: './rss-reader.component.html',
  styleUrls: ['./rss-reader.component.scss']
})
export class RssReaderComponent implements OnInit {

  constructor(private rssReaderService: RssReaderService ) { }

  feedList: Item[];

  ngOnInit() {
    this.rssReaderService.getFeedContent('https://e00-marca.uecdn.es/rss/portada.xml')
      .subscribe(data => {
        this.feedList = data.items;
      }
    )
  }

}
