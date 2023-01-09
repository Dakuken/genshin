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

  @Output() choicedRank: EventEmitter<string> = new EventEmitter<string>()


  constructor() {
  }

  ngOnInit(): void {
  }

  onChoicedRank(newChoicedRank: string) {
    this.choicedRank.emit(newChoicedRank);
  }

  qteUserwesh(str : string){
    console.log("wte fspok f")
  }

}
