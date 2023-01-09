import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mat} from "../../../../../interface/mat.interface";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() material!: Mat
  @Output() qteUser = new EventEmitter<string>()
  constructor() {
  }

  ngOnInit(): void {
  }

  onChangeQteUser(value : string){
    this.qteUser.emit('d f')
  }

}
