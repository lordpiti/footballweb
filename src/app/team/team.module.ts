import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {ImageCropperComponent, CropperSettings, ImageCropperModule} from 'ng2-img-cropper';
import { TeamDetailsEditModalComponent } from './team-edit-modal/team-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://localhost:57543/api/globalmedia/UploadDocument',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  paramName: 'files'
};


const teamRoutes: Routes = [
  { path: 'overview',  component: OverviewComponent },
  { path: 'detail/:id', component: TeamDetailComponent },
  { path: '**',  component: OverviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(teamRoutes),
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule.forChild(), ImageCropperModule
  ],
  declarations: [
    
  OverviewComponent,
    
  TeamDetailComponent,
    
  TeamDetailsEditModalComponent], 
  providers: [
    TeamService
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [TeamDetailsEditModalComponent]
})
export class TeamModule { }
