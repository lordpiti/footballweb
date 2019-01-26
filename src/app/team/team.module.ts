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
  MatCardModule
} from '@angular/material';


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
    MatCardModule
  ],
  declarations: [
    OverviewComponent,
    TeamDetailComponent,
    TeamChartComponent,
    SquadComponent,
    BasicInfoComponent,
    OverviewNgrxComponent,
    TeamNewsComponent
  ],
  providers: [
    TeamService,
    GooglemapsService
  ],
  exports: [
    RouterModule
  ]
})
export class TeamModule { }
