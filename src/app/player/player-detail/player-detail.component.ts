import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  constructor(private sharedService: ShareDataService) { }

  ngOnInit() {
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.sharedService.setCurrentArea(AppAreas.Players);
    },0);  
  }

}
