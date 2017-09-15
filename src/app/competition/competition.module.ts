import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionRoundComponent } from './competition-round/competition-round.component';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionOverviewComponent } from './competition-overview/competition-overview.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { CompetitionBasicInfoComponent } from './competition-basic-info/competition-basic-info.component';
import { CompetitionTeamsComponent } from './competition-teams/competition-teams.component';

const competitionRoutes: Routes = [
  { path: 'competitions',  component: CompetitionOverviewComponent },
  { path: 'detail/:id', component: CompetitionDetailComponent, children: [
    { path: '',   redirectTo: 'summary', pathMatch: 'full' },
    { path:'summary', component: CompetitionBasicInfoComponent },
    { path:'teams/:season', component: CompetitionTeamsComponent }
  ] },
  { path: '**',  component: CompetitionOverviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(competitionRoutes),
  ],
  declarations: [CompetitionRoundComponent, CompetitionOverviewComponent, CompetitionDetailComponent, CompetitionBasicInfoComponent, CompetitionTeamsComponent]
})
export class CompetitionModule { }
