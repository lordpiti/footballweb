import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { TeamDetailsEditModalComponent } from './team-edit-modal/team-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  declarations: [
    
  OverviewComponent,ImageCropperComponent,
    
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
