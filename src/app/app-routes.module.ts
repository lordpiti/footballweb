import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubrouteComponent } from './subroute/subroute.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'subrouteComponent', component: SubrouteComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'teams', loadChildren: './team/team.module#TeamModule' },
  { path: 'competitions', loadChildren: './competition/competition.module#CompetitionModule' },
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