import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompetitionOverviewComponent } from './competition-overview/competition-overview.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { CompetitionBasicInfoComponent } from './competition-basic-info/competition-basic-info.component';
import { CompetitionTeamsComponent } from './competition-teams/competition-teams.component';
import { CompetitionRoundComponent } from './competition-round/competition-round.component';
import { CompetitionService } from '../competition/competition.service';
import { SharedModule } from '../shared/shared.module';
import { MatchComponent } from '../shared/components/match/match.component';
import { CompetitionSimulationComponent } from './competition-simulation/competition-simulation.component';
import { CompetitionChartComponent } from './competition-chart/competition-chart.component';


const competitionRoutes: Routes = [
  { path: '',  component: CompetitionOverviewComponent },
  { path: 'detail/:id', component: CompetitionDetailComponent, children: [
    { path: '',   redirectTo: 'summary', pathMatch: 'full' },
    { path: 'summary', component: CompetitionBasicInfoComponent },
    { path: 'rounds', component: CompetitionRoundComponent },
    { path: 'match/:id', component: MatchComponent },
    { path: 'teams', component: CompetitionTeamsComponent }
  ] },
  { path: 'simulation', component: CompetitionSimulationComponent },
  { path: '**',  component: CompetitionOverviewComponent }
];

@NgModule({
  imports: [
    CommonModule, SharedModule,
    RouterModule.forChild(competitionRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CompetitionService
  ],
  declarations: [CompetitionRoundComponent, CompetitionOverviewComponent, CompetitionDetailComponent,
    CompetitionBasicInfoComponent, CompetitionTeamsComponent, CompetitionSimulationComponent, CompetitionChartComponent]
})
export class CompetitionModule { }
