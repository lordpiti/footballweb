import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDataService } from './services/shared-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ShareDataService
  ]
})
export class SharedModule { }
