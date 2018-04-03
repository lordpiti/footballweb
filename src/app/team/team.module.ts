import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamDetailsEditModalComponent } from './team-edit-modal/team-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamChartComponent } from './team-chart/team-chart.component';
import { SquadComponent } from './squad/squad.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { GooglemapsService } from './googlemaps.service';
import { SharedModule } from '../shared/shared.module';
import { BlogSectionComponent } from './blog-test/blog-section/blog-section.component';
import { BlogListComponent } from './blog-test/blog-list/blog-list.component';
import { AuthorSectionComponent } from './blog-test/author-section/author-section.component';
import { HomeComponent } from './blog-test/home/home.component';
import { AddBlogComponent } from './blog-test/add-blog/add-blog.component';
import { BlogTestComponent } from './blog-test/blog-test.component';


const teamRoutes: Routes = [
  { path: '',  component: OverviewComponent },
  { path: 'detail/:id', component: TeamDetailComponent, children: [
    { path: '',   redirectTo: 'summary', pathMatch: 'full' },
    { path: 'summary', component: BasicInfoComponent },
    { path: 'squad', component: SquadComponent },
    { path: 'competitions', component: TeamChartComponent }
  ] },
  { path: 'blog-test-ngrx',  component: BlogTestComponent },
  { path: '**',  component: OverviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(teamRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    OverviewComponent,
    TeamDetailComponent,
    TeamDetailsEditModalComponent,
    TeamChartComponent,
    SquadComponent,
    BasicInfoComponent,
    BlogSectionComponent,
    BlogListComponent,
    BlogTestComponent,
    HomeComponent,
    AuthorSectionComponent,
    AddBlogComponent
  ],
  providers: [
    TeamService,
    GooglemapsService
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [TeamDetailsEditModalComponent]
})
export class TeamModule { }
