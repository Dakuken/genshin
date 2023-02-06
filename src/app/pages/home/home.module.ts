import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchBarModule } from '../../components/search-bar/search-bar.module';
import {CharactersCardComponent} from "./components/characters-card/characters-card.component";
import {NbCardModule} from "@nebular/theme";
import {LoaderModule} from "../../components/loader/loader.module";


@NgModule({
  declarations: [HomeComponent,CharactersCardComponent],
    imports: [
        CommonModule,
        SearchBarModule,
        NbCardModule,
        LoaderModule,
    ]
})
export class HomeModule { }
