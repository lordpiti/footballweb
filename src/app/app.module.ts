import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule} from './app-routes.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDataService } from './shared/services/shared-data.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FacebookModule } from 'ngx-facebook';
import { AuthenticationModule } from './authentication/authentication.module';
import { TeamModule } from './team/team.module';
import { SampleService } from 'angular-piti-module-test';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './authentication/authInterceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './authentication/auth-guard';
import { BlogEffects } from './core/effects/blogEffects';
import { EffectsModule } from '@ngrx/effects';
import { blog } from './core/reducers/blog';
import { authorFilter } from './core/reducers/authorFilter';
import { team } from './core/reducers/team';
import { AuthorService } from './team/blog-test/services/author.service';
import { BlogService } from './team/blog-test/services/blog.service';
import { BlogActions } from './core/actions/blogAction';
import { environment } from '../environments/environment';
import { TeamActions } from './core/actions/teamAction';
import { TeamEffects } from './core/effects/teamEffects';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ApolloBoostModule, ApolloBoost } from 'apollo-angular-boost';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    OverlayModule,
    BootstrapModalModule,
    // SharedModule,
    BsDropdownModule.forRoot(),
    FacebookModule.forRoot(),
    AuthenticationModule,
    TeamModule, // Needed here for the modal popup
    // https://blog.angularindepth.com/making-your-angular-2-library-statically-analyzable-for-aot-e1c6f3ebedd5
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot({ blog, authorFilter, team }),
    EffectsModule.forRoot([BlogEffects, TeamEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    ApolloBoostModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ShareDataService,
    SampleService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthorService,
    BlogService,
    BlogActions,
    TeamActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(boost: ApolloBoost) {
    boost.create({
      uri: 'https://footballsandbox.azurewebsites.net/graphql'
    });
  }
}
