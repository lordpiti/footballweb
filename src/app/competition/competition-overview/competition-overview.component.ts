import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { Competition } from '../../shared/interfaces/competition.interface';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-competition-overview',
  templateUrl: './competition-overview.component.html',
  styleUrls: ['./competition-overview.component.scss'],
})
export class CompetitionOverviewComponent implements OnInit, AfterViewInit {
  public competitionList: Observable<Competition[]>;
  public displayedColumns = ['name', 'season', 'type'];
  public competitionListForTable = new MatTableDataSource([]);

  constructor(
    private _competitionService: CompetitionService,
    private sharedService: ShareDataService
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.competitionListForTable.sort = this.sort;
  }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Competitions);
    }, 0);

    this.competitionList = this._competitionService.getAllCompetitions();

    this.sharedService.setData(true);
    this._competitionService.getAllCompetitions().subscribe((response) => {
      this.sharedService.setData(false);
      this.competitionListForTable = new MatTableDataSource(response);
      this.competitionListForTable.sort = this.sort;
    });
  }
}
