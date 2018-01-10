import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ UserService ],
  declarations: []
})
export class UserModule { }
