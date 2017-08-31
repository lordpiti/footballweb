import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const teamRoutes: Routes = [
  { path: 'overview',  component: OverviewComponent },
  { path: 'detail/:id', component: TeamDetailComponent },
  { path: '**',  component: OverviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(teamRoutes)
  ],
  declarations: [
    
  OverviewComponent,
    
  TeamDetailComponent], 
  providers: [
    TeamService
  ],
  exports: [
    RouterModule
  ]
})
export class TeamModule { }