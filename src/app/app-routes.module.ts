// import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { SubrouteComponent } from './subroute/subroute.component';


// export const ROUTES: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'subroute', component: SubrouteComponent }
// ];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubrouteComponent } from './subroute/subroute.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'HomeComponent', component: HomeComponent },
  { path: 'subrouteComponent', component: SubrouteComponent },
  { path: '',   redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', loadChildren: './team/team.module#TeamModule' },
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