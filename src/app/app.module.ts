import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbCardModule, NbLayoutModule, NbSelectModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {CharactersService} from './service/characters.service';
import {HeaderComponent} from './components/header/header.component';
import {SearchBarModule} from './components/search-bar/search-bar.module';
import {FooterComponent} from './components/footer/footer.component';
import {CharactersModule} from "./pages/characters/characters.module";
import {ItemsService} from "./service/items.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    NbSelectModule,
  ],
  providers: [CharactersService, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
