import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { GooglemapsService } from '../googlemaps.service';
import {TeamService} from '../team.service';
import { Marker } from '../../shared/interfaces/marker.interface';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { AppAreas } from '../../shared/enums/app-areas';
import { Team } from '../../shared/interfaces/team.interface';
import { NgForm } from '@angular/forms';
import { BlobDataService } from '../../shared/services/blob-data.service';
import { MatDialog } from '@angular/material';
import { CropperPictureDialogComponent } from '../../shared/components/cropper-picture-dialog/cropper-picture-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../core/actions/teamAction';

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
  public teamDetails: Team;

  @Input() newid: number = null;

  constructor(private _googlemapsService: GooglemapsService, private _teamService: TeamService,
    private store: Store<{ team:{
      current: Team,
      loadingSpinner: boolean
    }  }>,
    private teamActions: TeamActions,
    public modal: Modal, private modalCropperService: ShareDataService, private blobDataService: BlobDataService,
    public dialog: MatDialog, vcr: ViewContainerRef) {
      this.teamDetails = { name: '', id: 0, playerList: [], pictureLogo: {}, stadium: {}, city: null};
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

    // const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';

    // if (this.teamDetails.pictureLogo.url.includes(';base64')) {
    //   this.blobDataService.addBase64Image(this.teamDetails.pictureLogo.url, cropperImageName)
    //   .pipe(switchMap(data => {
    //       team.pictureLogo = data;
    //       return this._teamService.saveTeamDetails(team);
    //   })).subscribe( x => {
    //     this._teamService.setCurrentTeam(team);
    //     alert('Competition details successfully saved');
    //   },
    //   (err: any) => {});
    // } else {
    //   this._teamService.saveTeamDetails(team).subscribe( x => {
    //     alert('Competition details successfully saved');
    //   },
    //   (err: any) => {});
    // }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CropperPictureDialogComponent, {
      // width: '550px',
      // minHeight: '600px';
      data: this.teamDetails.pictureLogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result) {
        this.teamDetails.pictureLogo.url = result;
      }
    });
  }

  onUploadError($event) {
  }

  onUploadSuccess($event) {

  }
}
