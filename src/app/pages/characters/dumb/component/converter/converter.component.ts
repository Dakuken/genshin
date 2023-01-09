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
  @Input() showCharacter : boolean = false
  @Input() showAscencion : boolean = false


  constructor() {
  }

  ngOnInit(): void {
  }

  qteUserwesh(str: string, item : Mat) {
      item.qte = str
  }
}
