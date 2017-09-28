import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDataService } from './services/shared-data.service';
import { MatchService } from './services/match.service';
import { MatchComponent } from './components/match/match.component';
import { Ng2FilterPipe } from 'ng2-filter-pipe';
import { BusyModule, BusyDirective } from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, BusyModule
  ],
  declarations: [MatchComponent, Ng2FilterPipe],
  providers: [
    ShareDataService, MatchService
  ],
  exports: [Ng2FilterPipe, BusyModule]
})
export class SharedModule { }
