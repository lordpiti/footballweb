import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamChartComponent } from './team-chart/team-chart.component';
import { SquadComponent } from './squad/squad.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { GooglemapsService } from './googlemaps.service';
import { SharedModule } from '../shared/shared.module';
import { OverviewNgrxComponent } from './overview-ngrx/overview-ngrx.component';
import { TeamNewsComponent } from './team-news/team-news.component';
import {
  MatSidenavModule,
  MatCheckboxModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCardModule
} from '@angular/material';
import { TeamInfoModalComponent } from './basic-info/team-info-modal/team-info-modal.component';
import { DROPZONE_CONFIG, DropzoneModule, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


const teamRoutes: Routes = [
  { path: '',  component: OverviewNgrxComponent },
  { path: 'detail/:id', component: TeamDetailComponent, children: [
    { path: '',   redirectTo: 'team-news', pathMatch: 'full' },
    { path: 'summary', component: BasicInfoComponent },
    { path: 'squad', component: SquadComponent },
    // { path: 'competitions', component: TeamChartComponent },
    { path: 'team-news', component: TeamNewsComponent }
  ] },
  { path: 'test-ngrx',  component: OverviewNgrxComponent },
  { path: '**',  component: OverviewComponent }
];

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(teamRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    DropzoneModule
  ],
  declarations: [
    OverviewComponent,
    TeamDetailComponent,
    TeamChartComponent,
    SquadComponent,
    BasicInfoComponent,
    OverviewNgrxComponent,
    TeamNewsComponent,
    TeamInfoModalComponent
  ],
  entryComponents: [TeamInfoModalComponent],
  providers: [
    TeamService,
    GooglemapsService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  exports: [
    RouterModule
  ]
})
export class TeamModule { }
