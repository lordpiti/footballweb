import { Component, OnInit, ViewChild } from '@angular/core';
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
export class PlayerOverviewComponent implements OnInit {

  public playerList: Array<Player>;
  public playerListForTable = new MatTableDataSource([]);
  public displayedColumns = ['name', 'surname', 'teamName'];
  public p = 1;
  pageEvent: PageEvent;

  constructor(private sharedService: ShareDataService, private playerService: PlayerService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // name: string;
  // surname: string;
  // teamName: string;
  // dorsal: number;
  // teamId: number;
  // playerId: number;
  // position: string;
  // birthDate: Date;

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.setCurrentArea(AppAreas.Players);
    }, 0);

    this.playerService.getPlayers().subscribe(
      (data: Array<Player>) => {
          this.playerList = data;
          this.playerListForTable = new MatTableDataSource(data);
          this.playerListForTable.sort = this.sort;
          this.playerListForTable.paginator = this.paginator;
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
