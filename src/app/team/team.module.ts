import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    
  OverviewComponent], 
  providers: [
    TeamService
  ]
})
export class TeamModule { }
