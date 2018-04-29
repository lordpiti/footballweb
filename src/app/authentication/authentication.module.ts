import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from './google-auth.service';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { UserService } from './user.service';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  providers: [ GoogleAuthService, UserService],
  declarations: [ LoginComponent ],
  exports: [ LoginComponent ]
})
export class AuthenticationModule {
}
