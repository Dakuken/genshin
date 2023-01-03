import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCharactersComponent } from './detail-characters.component';
import { SearchBarModule } from '../../components/search-bar/search-bar.module';
import { NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import {AppModule} from "../../app.module";

@NgModule({
  declarations: [DetailCharactersComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    AppModule
  ],
  exports: [DetailCharactersComponent]
})
export class DetailCharactersModule { }
