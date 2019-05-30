import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { PlayerService } from '../player.service';
import { Player } from '../../shared/interfaces/player.interface';
import { MatTableDataSource, MatSort, PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit, AfterViewInit {

  public playerList: Array<Player>;
  public playerListForTable = new MatTableDataSource([]);
  public displayedColumns = ['name', 'surname', 'teamName'];
  public p = 1;
  pageEvent: PageEvent;

  constructor(private sharedService: ShareDataService, private playerService: PlayerService) { }

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.playerListForTable.sort = this.sort;
  }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Players);
    }, 0);

    this.sharedService.setData(true);

    this.playerService.getPlayers().subscribe(
      (response: Array<Player>) => {
        this.sharedService.setData(false);
          this.playerList = response;
          this.playerListForTable = new MatTableDataSource(response);
          this.playerListForTable.sort = this.sort;
          this.playerListForTable.paginator = this.paginator;
          this.playerListForTable.filterPredicate =
          (data: Player, filter: string) => {
            const trimmedLowerCasedFilterName = data.name.trim().toLowerCase();
            const trimmedLowerCasedFilterSurname = data.surname.trim().toLowerCase();

            return trimmedLowerCasedFilterName.includes(filter) || trimmedLowerCasedFilterSurname.includes(filter);
          };
      },
      (err: any) => {
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

    this.playerListForTable.filter = filterValue;
  }

}
