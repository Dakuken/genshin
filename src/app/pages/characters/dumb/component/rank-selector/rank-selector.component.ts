import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-rank-selector-component',
  templateUrl: './rank-selector.component.html',
  styleUrls: ['./rank-selector.component.scss']
})
export class RankSelectorComponent implements OnInit, OnChanges {

  @Input() elevationRanks : string[] = []
  @Output() choicedRank : EventEmitter<string> = new EventEmitter<string>()
  rank: string = '-1'

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rank = '-1'
  }

  wichRank(newRank: string) {
    if(this.rank === newRank) return
    this.rank = newRank
    this.choicedRank.emit(this.rank)
  }

}
