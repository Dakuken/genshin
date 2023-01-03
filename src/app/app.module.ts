import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbCardModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { CharactersService } from './service/characters.service';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarModule } from './components/search-bar/search-bar.module';
import { FooterComponent } from './components/footer/footer.component';
import {oneRankComponent} from "./pages/detail-characters/one-rank/one-rank.component";
import {CharactersModule} from "./pages/characters/characters.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    oneRankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SearchBarModule,
    CharactersModule,

    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
  ],
  providers: [CharactersService],
  exports: [
    oneRankComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
