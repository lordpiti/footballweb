import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from './google-auth.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  providers: [GoogleAuthService, UserService],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
