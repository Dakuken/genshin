import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharactersDumb} from "./dumb/characters.dumb";
import {CharactersComponentSmart} from "./smart/characters.smart";
import {NbCardModule, NbSelectModule} from "@nebular/theme";
import {RankSelectorComponent} from "./dumb/component/rank-selector/rank-selector.component";

@NgModule({
  declarations: [CharactersComponentSmart,CharactersDumb,RankSelectorComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbSelectModule,
  ],
  exports: [CharactersComponentSmart]
})
export class CharactersModule { }
