import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayerOverviewComponent } from './player-overview/player-overview.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerBasicInfoComponent } from './player-basic-info/player-basic-info.component';
import { PlayerService } from './player.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatButtonModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule,
  MatExpansionModule, 
  MatCardModule} from '@angular/material';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { MatchComponent } from '../shared/components/match/match.component';


const playerRoutes: Routes = [
  { path: '',  component: PlayerOverviewComponent },
  { path: 'detail/:id', component: PlayerDetailComponent, children: [
    { path: '',   redirectTo: 'summary', pathMatch: 'full' },
    { path: 'summary', component: PlayerBasicInfoComponent },
    { path: 'stats/match/:id', component: MatchComponent },
    { path: 'stats', component: PlayerStatsComponent }
  ] },
  { path: '**',  component: PlayerOverviewComponent }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(playerRoutes),
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [
    PlayerService
  ],
  declarations: [PlayerOverviewComponent, PlayerDetailComponent,
    PlayerBasicInfoComponent,
    PlayerStatsComponent]
})
export class PlayerModule { }

