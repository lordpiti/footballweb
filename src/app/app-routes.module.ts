import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'teams', loadChildren: 'app/team/team.module#TeamModule' },
  { path: 'competitions', loadChildren: 'app/competition/competition.module#CompetitionModule' },
  { path: 'players', loadChildren: 'app/player/player.module#PlayerModule' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }