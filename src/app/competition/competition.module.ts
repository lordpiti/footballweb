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
// tslint:disable-next-line:max-line-length
import { CompetitionSimulationEventComponent } from './competition-simulation/competition-simulation-event/competition-simulation-event.component';
import { CompetitionMatchesComponent } from './competition-matches/competition-matches.component';
import { CompetitionSummaryComponent } from './competition-summary/competition-summary.component';
import { DrawMatchComponent } from './competition-basic-info/draw-match/draw-match.component';
// tslint:disable-next-line:max-line-length
import { CompetitionSimulationMatchComponent } from './competition-simulation/competition-simulation-match/competition-simulation-match.component';
import { MatTableModule, MatSortModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatCardModule } from '@angular/material';

const competitionRoutes: Routes = [
  { path: '',  component: CompetitionOverviewComponent },
  { path: 'detail/:id', component: CompetitionDetailComponent, children: [
    { path: '',   redirectTo: 'summary', pathMatch: 'full' },
    { path: 'summary', component: CompetitionSummaryComponent },
    { path: 'rounds/match/:id', component: MatchComponent },
    { path: 'rounds', component: CompetitionMatchesComponent },
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
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    SharedModule
  ],
  providers: [
    CompetitionService
  ],
  declarations: [CompetitionRoundComponent, CompetitionOverviewComponent, CompetitionDetailComponent,
    CompetitionBasicInfoComponent, CompetitionTeamsComponent,
    CompetitionSimulationComponent,
    CompetitionChartComponent,
    CompetitionSimulationEventComponent,
    CompetitionMatchesComponent,
    CompetitionSummaryComponent, DrawMatchComponent,
    CompetitionSimulationMatchComponent
]
})
export class CompetitionModule { }
