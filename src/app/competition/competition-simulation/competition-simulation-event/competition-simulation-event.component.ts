import { Component, OnInit, Input } from '@angular/core';
import { MatchEvent } from '../../../shared/interfaces/match-event.interface';

@Component({
  selector: 'app-competition-simulation-event',
  templateUrl: './competition-simulation-event.component.html',
  styleUrls: ['./competition-simulation-event.component.scss']
})
export class CompetitionSimulationEventComponent implements OnInit {

  @Input() matchEvent: MatchEvent;

  constructor() { }

  ngOnInit() {
  }

}
