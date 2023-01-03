import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rank-selector-component',
  templateUrl: './rank-selector.component.html',
  styleUrls: ['./rank-selector.component.scss']
})
export class RankSelectorComponent implements OnInit {

  @Input() elevationRanks : string[] = []
  rank: string = '-1'


  constructor() {
  }

  ngOnInit(): void {
  }
  wichRank(newRank: string) {
    if(this.rank === newRank) return
    this.rank = newRank
  }

}
