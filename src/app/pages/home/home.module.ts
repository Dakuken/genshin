import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchBarModule } from '../../components/search-bar/search-bar.module';
import { DetailCharactersModule } from '../detail-characters/detail-characters.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    DetailCharactersModule
  ]
})
export class HomeModule { }
