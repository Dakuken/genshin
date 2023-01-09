import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DetailCharactersComponent } from './pages/detail-characters/detail-characters.component';
import { HomeComponent } from './pages/home/home.component';
// import {CharactersModule} from "./pages/characters/characters.module";
import {CharactersComponentSmart} from "./pages/characters/smart/characters.smart";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'characters/:id', component: CharactersComponentSmart },
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
