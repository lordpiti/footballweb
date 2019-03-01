import { Component, OnInit, Input } from '@angular/core';
import { GooglemapsService } from '../googlemaps.service';
import { Marker } from '../../shared/interfaces/marker.interface';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { Team } from '../../shared/interfaces/team.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../core/actions/teamAction';
import { TeamInfoModalComponent } from './team-info-modal/team-info-modal.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  styles:
  [`
  .sebm-google-map-container {
     height: 300px;
   }
`]
})
export class BasicInfoComponent implements OnInit {

  zoom = 15;

  location: any;
  stadium: any;
  markers: Marker[] = [];
  public teamDetails$: Observable<Team>;
  public snackbar$: Observable<string>;
  public teamDetails: Team;

  @Input() newid: number = null;

  userRole = localStorage.role;

  constructor(private _googlemapsService: GooglemapsService,
    private store: Store<{ team:{
      current: Team,
      loadingSpinner: boolean,
      snackbar: string
    }  }>,
    private teamActions: TeamActions,
    public modal: Modal, private modalCropperService: ShareDataService,
    public dialog: MatDialog, public snackBar: MatSnackBar) {
      this.teamDetails = {
        name: '',
        id: 0,
        playerList: [],
        pictureLogo: {},
        stadium: {},
        city: null
      };
  }

  ngOnInit() {

    setTimeout(() => {
      this.modalCropperService.setCurrentArea(AppAreas.Teams);
    }, 0);

    this.teamDetails$ = this.store.select(x=>x.team.current);

    this.teamDetails$.subscribe(data => {
      if (data) {
        this.teamDetails = Object.assign({}, data);
        this.stadium = data.stadium;
        this.loadGoogleMapsData(this.stadium.name);
      }
    });

    this.snackbar$ = this.store.select(x => x.team.snackbar);
    this.snackbar$.subscribe(value => {
      if (value) {
        this.openSnackBar(value, '');
        this.store.dispatch(this.teamActions.showSnackbar(null));
      }
    });

  }

  loadGoogleMapsData(stadiumName: string) {
    this._googlemapsService.getData(stadiumName).subscribe(
      (data: any) => {
        if (data && data.status === 'OK' && data.results) {
          this.location = data.results[0].geometry.location;
          this.markers.push({
            lat: this.location.lat,
            lng: this.location.lng,
            label: null, // this.teamDetails.stadium.name,
            draggable: false
          });
        } else {
          console.log('Google maps returned an error: ' + data.error_message);
        }
      }
    );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: null,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  saveTeamDetails(team: Team, form: NgForm) {

    this.store.dispatch(this.teamActions.saveTeamDetails(team));

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeamInfoModalComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.teamDetails
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.store.dispatch(this.teamActions.saveTeamDetails(result));
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 3000;
    config.horizontalPosition = 'right';
    this.snackBar.open(message, null, config);
  }
}
