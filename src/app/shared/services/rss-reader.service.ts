import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { RSSResponse } from '../interfaces/rss-feed.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RssReaderService extends BaseService {

  private rssToJsonServiceBaseUrl: string = environment.rss2json_base_url;

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  getFeedContent(url: string): Observable<RSSResponse> {
    return this.httpNew.get<RSSResponse>(this.rssToJsonServiceBaseUrl + url);
  }

  private extractFeeds(res: Response): any {
    let feed = res.json();
    return feed || { };
  }

}

