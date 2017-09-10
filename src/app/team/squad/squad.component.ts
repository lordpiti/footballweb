import { Component, OnInit, Input } from '@angular/core';
import { TeamService} from '../team.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {

  public playerList: any;

  constructor(private _teamService: TeamService) { 

  }

  ngOnInit() {
    //Preguntar como hacer esto solamente con subscribe ... no parece q se pueda
    if (this._teamService.currentTeam){
      this.playerList = this._teamService.currentTeam.playerList;
    }

    this._teamService.getCurrentTeam().subscribe(data => {
      this.playerList = data.playerList;
    });
  }

}
