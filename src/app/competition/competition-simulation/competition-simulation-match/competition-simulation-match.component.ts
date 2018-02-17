import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-competition-simulation-match',
  templateUrl: './competition-simulation-match.component.html',
  styleUrls: ['./competition-simulation-match.component.scss']
})
export class CompetitionSimulationMatchComponent implements OnInit {

  @Input() match: any;

  constructor() { }

  ngOnInit() {
  }

}
