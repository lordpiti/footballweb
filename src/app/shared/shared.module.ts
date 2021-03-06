import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from './services/match.service';
import { MatchComponent } from './components/match/match.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
// import { AgmCoreModule } from '@agm/core';
// import { DropzoneModule, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ChartsModule } from 'ng2-charts';
import {
  ImageCropperComponent,
  CropperSettings,
  ImageCropperModule,
} from 'ngx-img-cropper';
import { MatchPlayersComponent } from './components/match/match-players/match-players.component';
// import { PopoverModule } from 'ngx-popover';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatchPlayerStatisticsComponent } from './components/match-player-statistics/match-player-statistics.component';
import { MatchPlayersSingleComponent } from './components/match/match-players/match-players-single/match-players-single.component';
import { CustomFormInputComponent } from './components/custom-form-input/custom-form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormSelectComponent } from './components/custom-form-select/custom-form-select.component';
import { ValuesPipe } from './pipes/values.pipe';
import { MomentModule } from 'angular2-moment';
import { OrderModule } from 'ngx-order-pipe';
import { DetailsLayoutComponent } from './components/details-layout/details-layout.component';
import { RouterModule } from '@angular/router';
import { CropperPictureDialogComponent } from './components/cropper-picture-dialog/cropper-picture-dialog.component';
import { BlobDataService } from './services/blob-data.service';
import { RssReaderComponent } from './components/rss-reader/rss-reader.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { IsAuthenticatedWithRolesDirective } from './directives/is-authenticated-with-roles/is-authenticated-with-roles.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BusyModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAhnlVo62cLGyWwCM6JS3I32hZE5AoBfHI',
    // }),
    // DropzoneModule,
    ChartsModule,
    ImageCropperModule,
    Ng2FilterPipeModule,
    // PopoverModule,
    NgxPaginationModule,
    MomentModule,
    OrderModule,
    RouterModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
  ],
  declarations: [
    MatchComponent,
    MatchPlayersComponent,
    MatchPlayerStatisticsComponent,
    MatchPlayersSingleComponent,
    CustomFormInputComponent,
    CustomFormSelectComponent,
    ValuesPipe,
    DetailsLayoutComponent,
    CropperPictureDialogComponent,
    RssReaderComponent,
    LoadingSpinnerComponent,
    IsAuthenticatedWithRolesDirective,
  ],
  entryComponents: [CropperPictureDialogComponent, LoadingSpinnerComponent],
  providers: [MatchService, BlobDataService],
  exports: [
    // BusyModule,
    // AgmCoreModule,
    ChartsModule,
    // DropzoneModule,
    ImageCropperModule,
    NgxPaginationModule,
    CustomFormInputComponent,
    CustomFormSelectComponent,
    DetailsLayoutComponent,
    ValuesPipe,
    MomentModule,
    OrderModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    RssReaderComponent,
    LoadingSpinnerComponent,
    IsAuthenticatedWithRolesDirective,
  ],
})
export class SharedModule {}
