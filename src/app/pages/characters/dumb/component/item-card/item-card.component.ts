import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mat} from "../../../../../interface/mat.interface";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() material!: Mat

  @Input() isLastConverter = false
  @Input() isConverter = false
  @Output() qteUser = new EventEmitter<string>()
  constructor() {
  }

  ngOnInit(): void {
  }

  onChangeQteUser(value : string){
    this.qteUser.emit(value)
  }

  converterDisplay() : string{
    if(!this.material.qte && this.isLastConverter) {
      return "0"
    }
    if(!this.material.qte){
      return " "
    }

    if(this.isLastConverter){
      return this.material.qte
    }

    return `+ ${this.material.qte}`
  }

}
