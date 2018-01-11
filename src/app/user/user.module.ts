import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ UserService ],
  declarations: []
})
export class UserModule { }
