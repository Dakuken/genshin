import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Elevation} from "../../../interface/elevation.interface";
import {Mat} from "../../../interface/mat.interface";
import {ConverterClass} from "../../../model/Converter.class";

@Component({
  selector: 'app-characters-component',
  templateUrl: './characters.dumb.html',
  styleUrls: ['./characters.dumb.scss']
})
export class CharactersDumb implements OnInit {
  @Input() character!: string
  @Input() elevationRanks: string[] = []
  @Input() elevation: Elevation | undefined
  @Input() materials: Mat[] = []
  @Input() converter: ConverterClass = new ConverterClass()
  @Input() portrait : any

  @Output() choicedRank: EventEmitter<string> = new EventEmitter<string>()

  showAscension = false
  showCharacter = false

  constructor() {
  }

  ngOnInit(): void {
  }

  onChoicedRank(newChoicedRank: string) {
    this.choicedRank.emit(newChoicedRank);
  }

  onClickConverter(index : number) {
    if (index === 0) {
      this.showCharacter = !this.showCharacter
    } else if (index === 2){
      this.showAscension = !this.showAscension
    }
  }

}
