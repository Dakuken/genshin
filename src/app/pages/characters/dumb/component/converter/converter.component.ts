import {Component, Input, OnInit} from '@angular/core';
import {ConverterClass} from "../../../../../model/Converter.class";
import {Mat} from "../../../../../interface/mat.interface";

@Component({
  selector: 'app-converter-component',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() converter: ConverterClass = new ConverterClass()
  @Input() showCharacter: boolean = false
  @Input() showAscencion: boolean = false
  @Input() theme!: string


  constructor() {
  }

  ngOnInit(): void {
  }

  onChangeQteUser(str: string, index: number, isMat1: boolean) {
    let materials = (isMat1) ? this.converter.mat1 : this.converter.mat2
    this.conversion(materials, Number(index), str)
  }

  conversion(materials: Mat[], index: number, qte: string) {
    materials[index].qteUser = qte
    for (let i = index; i <= materials.length - 2; i++) {
      materials[i + 1].qte = this.conversionCalcul(materials[i])
    }
  }

  conversionCalcul(mat: Mat) {
    let qteUser = Number(mat.qteUser)
    let qteFromPrevious = Number(mat.qte)
    // because of conversion materials
    let qteTot =  Math.floor((qteUser + qteFromPrevious)/3)
    return String(qteTot)
  }
}
