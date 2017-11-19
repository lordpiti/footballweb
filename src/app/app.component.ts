import { Component, OnInit, NgZone  } from '@angular/core';
import { ShareDataService } from './shared/services/shared-data.service';
import { AppAreas } from './shared/enums/app-areas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public appArea: AppAreas;
  public loggedIn: boolean = false;

  constructor(private sharedService: ShareDataService){
      this.sharedService.setCurrentArea(AppAreas.Start);
  }


  ngOnInit() {

    this.sharedService.getCurrentArea().subscribe(data => {
      this.appArea = data;
    });
  }
}
