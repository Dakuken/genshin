import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Elevation} from "../../../interface/elevation.interface";
import {Mat} from "../../../interface/mat.interface";
import {ConverterClass} from "../../../model/Converter.class";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-characters-component',
  templateUrl: './characters.dumb.html',
  styleUrls: ['./characters.dumb.scss'],
  animations: [
    trigger("fade", [
        transition(":leave", [
          animate("1s", style({opacity: '0'}))
        ])
      ])
  ]
})

export class CharactersDumb implements OnInit {
  @Input() character!: string
  @Input() elevationRanks: string[] = []
  @Input() elevation: Elevation | undefined
  @Input() materials: Mat[] = []
  @Input() converter: ConverterClass = new ConverterClass()
  @Input() portrait: any

  @Input() theme!: string;

  @Output() choicedRank: EventEmitter<string> = new EventEmitter<string>()

  showAscension = false
  showCharacter = false

  constructor(private renderer: Renderer2) {
  }

  onChangeMesCouilles(){

  }
  ngOnInit(): void {
    console.log(this.portrait)
  }

  onChoicedRank(newChoicedRank: string) {
    this.choicedRank.emit(newChoicedRank);
  }

  onClickConverter(index: number) {
    if (index === 0) {
      this.showCharacter = !this.showCharacter
    } else if (index === 2) {
      this.showAscension = !this.showAscension
    }
  }

  hasConverter(i: number) {
    if (i === 1 || i > 2) {
      return ''
    }

    let mat: Mat[] = (i === 0) ? this.converter.mat1 : this.converter.mat2
    if (mat.length === 0) {
      return ''
    }
    return 'hover:opacity-80 cursor-pointer'
  }

  myportrait(){
    if(!this.portrait){
      return
    }

      return this.portrait;

  }

  // parallax(e: any) {
  //   let image = <HTMLImageElement>document.querySelector("#splash")
  //   const imageWidth = image.offsetWidth;
  //   const imageHeigth = image.offsetHeight;
  //   const centerX = window.innerWidth - imageWidth / 2
  //   const centerY = imageHeigth / 2
  //   let mouseX = (e.clientX - centerX);
  //   let mouseY = (e.clientY - centerY);
  //   const rotateXUncapped = ((+1) * 25 * mouseY / (imageHeigth / 2))
  //   const rotateYUncapped = ((-1) * 25 * mouseX / (imageWidth / 2))
  //   console.log(centerY, centerX)
  //   console.log(e.clientY, e.clientX)
  //   // console.log(centerX)
  //   // console.log(imageWidth, image.offsetLeft)
  //   const rotateX = rotateXUncapped < -25 ? -25 : (rotateXUncapped > 25 ? 25 : rotateXUncapped)
  //   const rotateY = rotateYUncapped < -25 ? -25 : (rotateYUncapped > 25 ? 25 : rotateYUncapped)
  //
  //   image.setAttribute("style", `transform : rotateY(${rotateY}deg) rotateX(${rotateX}deg)`)
  //
  //
  // }
  //
  // exitParallax() {
  //   let image = <HTMLImageElement>document.querySelector("#splash")
  //   image.setAttribute("style", `transform : rotateY(0deg) rotateX(0deg); `)
  // }
}
