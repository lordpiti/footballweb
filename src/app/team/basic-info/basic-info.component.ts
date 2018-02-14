import { Component, OnInit, Input, ViewContainerRef, OnChanges } from '@angular/core';
import { GooglemapsService } from '../googlemaps.service';
import {TeamService} from '../team.service';
import { Marker } from '../../shared/interfaces/marker.interface';
import { AgmMap, AgmMarker, MapsAPILoader } from '@agm/core';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ShareDataService } from '../../shared/services/shared-data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppAreas } from '../../shared/enums/app-areas';
import { Team } from '../../shared/interfaces/team.interface';
import { NgForm } from '@angular/forms';
import { TeamDetailsEditModalComponent } from '../team-edit-modal/team-edit-modal.component';
import { overlayConfigFactory } from 'ngx-modialog';

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
  markers: Marker[] = [
  {
    lat: 51.673858,
    lng: 7.815982,
    label: 'A',
    draggable: true
  },
  {
    lat: 51.373858,
    lng: 7.215982,
    label: 'B',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'C',
    draggable: true
  }
  ];

  public teamDetails: Team;
  public teamLogo: any;

  @Input() newid: number = null;

  constructor(private _googlemapsService: GooglemapsService, private _teamService: TeamService,
    public modal: Modal, private modalCropperService: ShareDataService, public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
      this.teamDetails = { name: '', id: 0, playerList: [], pictureLogo: {}, stadium: {}, city: null};
  }

  ngOnInit() {

    setTimeout(() => {
      this.modalCropperService.setCurrentArea(AppAreas.Teams);
    }, 0);

    if (this._teamService.currentTeam) {
      this.teamDetails = Object.assign({}, this._teamService.currentTeam);
      this.stadium = this._teamService.currentTeam.stadium;
      this.teamLogo = this._teamService.currentTeam.pictureLogo;
      this.loadGoogleMapsData(this.stadium.name);
    }

    this._teamService.getCurrentTeam().subscribe(data => {
      this.teamDetails = Object.assign({}, data);
      this.teamLogo = data.pictureLogo;
      this.stadium = data.stadium;
      this.loadGoogleMapsData(this.stadium.name);
    });

    this.modalCropperService.getData().subscribe(data => {
      this.teamLogo = data;
    });

  }

  loadGoogleMapsData(stadiumName: string) {
    this._googlemapsService.getData(stadiumName).subscribe(
      (data: any) => {
        // console.log(data);
        if (data && data.results) {
          this.location = data.results[0].geometry.location;
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

    if (form.valid) {
      team.pictureLogo = this.teamLogo;
      this._teamService.saveTeamDetails(team).subscribe(
        (data: boolean) => {

          this._teamService.setCurrentTeam(team);
          this.toastr.success('Team details successfully saved', 'Success!');
        },
        (err: any) => {
        }
      );
    }
  }

  showModalEvent(team: Team) {
    this.modal.open(TeamDetailsEditModalComponent,
      overlayConfigFactory({ teamDetails: team }, BSModalContext));
  }


  onUploadError($event) {
  }

  onUploadSuccess($event) {

  }

}
