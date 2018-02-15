import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../shared/interfaces/match.interface';

@Component({
  selector: 'app-draw-match',
  templateUrl: './draw-match.component.html',
  styleUrls: ['./draw-match.component.scss']
})
export class DrawMatchComponent implements OnInit {

  @Input() match: Match;
  @Input() competitionData: any;

  constructor() { }

  ngOnInit() {
  }

}
