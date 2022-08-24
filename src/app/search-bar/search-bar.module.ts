import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbInputModule, NbListModule } from '@nebular/theme';
import { SearchBarComponent } from './search-bar.component';



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    NbInputModule
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
