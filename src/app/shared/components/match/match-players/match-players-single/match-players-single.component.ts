import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../../../interfaces/player.interface';

@Component({
  selector: 'app-match-players-single',
  templateUrl: './match-players-single.component.html',
  styleUrls: ['./match-players-single.component.scss']
})
export class MatchPlayersSingleComponent implements OnInit {

  @Input() player: any;
  @Input() matchId: number;
  public selectPlayer:boolean;

  constructor() { }

  ngOnInit() {
    this.selectPlayer = false;
  }

  loadData(){
    this.selectPlayer = true;
  }

}
