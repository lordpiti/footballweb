import { Component, OnInit, Input } from '@angular/core';
import { DetailsMenuData } from '../../interfaces/details-menu-data.interface';

@Component({
  selector: 'app-details-layout',
  templateUrl: './details-layout.component.html',
  styleUrls: ['./details-layout.component.scss']
})
export class DetailsLayoutComponent implements OnInit {

  @Input() detailsMenuData: DetailsMenuData;

  constructor() { }

  ngOnInit() {
  }

}
