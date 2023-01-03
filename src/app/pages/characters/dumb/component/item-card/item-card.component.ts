import {Component, Input, OnInit} from '@angular/core';
import {Mat} from "../../../../../interface/mat.interface";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() material!: Mat
  constructor() {
  }

  ngOnInit(): void {
  }


}
