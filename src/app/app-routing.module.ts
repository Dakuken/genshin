import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCharactersComponent } from './detail-characters/detail-characters.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'characters/:id', component: DetailCharactersComponent },
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
