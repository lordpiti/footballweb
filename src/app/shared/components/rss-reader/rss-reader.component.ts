import { Component, OnInit, Input } from '@angular/core';
import { RssReaderService } from '../../services/rss-reader.service';
import { Item } from '../../interfaces/rss-feed.interface';

@Component({
  selector: 'app-rss-reader',
  templateUrl: './rss-reader.component.html',
  styleUrls: ['./rss-reader.component.scss']
})
export class RssReaderComponent implements OnInit {

  @Input() feedUrl : string;

  constructor(private rssReaderService: RssReaderService ) { }

  feedList: Item[];

  ngOnInit() {
    this.rssReaderService.getFeedContent(this.feedUrl)
      .subscribe(data => {
        this.feedList = data.items;
      }
    )
  }

}
