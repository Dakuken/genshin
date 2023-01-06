import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersDumb} from "./dumb/characters.dumb";
import {CharactersComponentSmart} from "./smart/characters.smart";
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {RankSelectorComponent} from "./dumb/component/rank-selector/rank-selector.component";
import {ItemCardComponent} from "./dumb/component/item-card/item-card.component";
import {FormsModule} from "@angular/forms";
import {ConverterComponent} from "./dumb/component/converter/converter.component";

@NgModule({
  declarations: [CharactersComponentSmart, CharactersDumb, RankSelectorComponent, ItemCardComponent,ConverterComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
  ],
  exports: [CharactersComponentSmart]
})
export class CharactersModule {
}
