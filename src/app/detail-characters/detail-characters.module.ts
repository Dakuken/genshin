import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCharactersComponent } from './detail-characters.component';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [DetailCharactersComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule
  ],
  exports: [DetailCharactersComponent]
})
export class DetailCharactersModule { }
