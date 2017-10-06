import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from './services/match.service';
import { MatchComponent } from './components/match/match.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
//import { BusyModule, BusyDirective } from 'angular2-busy';
import { AgmCoreModule } from '@agm/core';
import { DropzoneModule, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ChartsModule } from 'ng2-charts';
 import { ImageCropperComponent, CropperSettings, ImageCropperModule } from 'ng2-img-cropper';
import { MatchPlayersComponent } from './components/match/match-players/match-players.component';


@NgModule({
  imports: [
    CommonModule, 
    // BusyModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhnlVo62cLGyWwCM6JS3I32hZE5AoBfHI'
    }),
    DropzoneModule.forChild(),
    ChartsModule,
     ImageCropperModule, 
    Ng2FilterPipeModule
  ],
  declarations: [MatchComponent, MatchPlayersComponent],
  providers: [ 
    MatchService
  ],
  exports: [ 
    // BusyModule, 
    AgmCoreModule, 
    ChartsModule, 
    DropzoneModule, 
    ImageCropperModule
  ]
})
export class SharedModule {
  // static forRoot() {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [
  //       MatchService
  //     ]
  //   };
  // }
 }
