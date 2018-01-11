import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule} from './app-routes.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDataService } from './shared/services/shared-data.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FacebookModule } from 'ngx-facebook';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginComponent } from './authentication/login/login.component';
import { UserService } from './user/user.service';
import { TeamModule } from './team/team.module';
import { SampleService } from 'angular-piti-module-test';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './authentication/authInterceptor';

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
    BootstrapModalModule,
    //SharedModule, 
    ToastModule.forRoot(),
    BsDropdownModule.forRoot(),
    FacebookModule.forRoot(),
    AuthenticationModule, 
    TeamModule //Needed here for the modal popup
  ],
  providers: [ShareDataService, UserService, SampleService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
