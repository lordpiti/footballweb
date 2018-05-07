import { Component, OnInit, Input } from '@angular/core';
import { DetailsMenuData } from '../../interfaces/details-menu-data.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-layout',
  templateUrl: './details-layout.component.html',
  styleUrls: ['./details-layout.component.scss']
})
export class DetailsLayoutComponent implements OnInit {

  @Input() detailsMenuData: DetailsMenuData;
  selectedOption: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedOption = this.detailsMenuData.itemsList[0].link;
  }

  changeSelectedRound(a: any) {
    this.selectedOption = a.value;
    this.router.navigate([a.value], {relativeTo: this.route});
  }

}
