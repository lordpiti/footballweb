import { Component, OnInit } from '@angular/core';
import { GooglemapsService } from '../googlemaps.service';
import {TeamService} from '../team.service';
import { marker } from '../../shared/interfaces/marker.interface';
import { AgmMap, AgmMarker, MapsAPILoader } from '@agm/core';

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

  zoom: number = 15;

  location:any;
  stadium: any;

  constructor(private _googlemapsService: GooglemapsService, private _teamService: TeamService) { 

  }

  ngOnInit() {

    if (this._teamService.currentTeam){
      this.stadium = this._teamService.currentTeam.stadium;
      this.loadGoogleMapsData(this.stadium.name);
    }

    this._teamService.getCurrentTeam().subscribe(data => {
      this.stadium = data.stadium;
      this.loadGoogleMapsData(this.stadium.name);
    });


  }

  loadGoogleMapsData(stadiumName: string){
    this._googlemapsService.getData(stadiumName).subscribe(
      (data: any) => {
        // console.log(data);
        this.location = data.results[0].geometry.location;
      }
    );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: null, 
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
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
  ]
}
