import {Component, Input, OnInit} from '@angular/core';
import {Mat} from "../../../../../interface/mat.interface";
import {ConverterClass} from "../../../../../model/Converter.class";

@Component({
  selector: 'app-converter-component',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() converter: ConverterClass = new ConverterClass()

  constructor() {
    console.log('qp sdk,dsp kf,')
  }

  ngOnInit(): void {
  }

  qteUserwesh(str: string) {
    console.log('rg dgf');
  }
}
