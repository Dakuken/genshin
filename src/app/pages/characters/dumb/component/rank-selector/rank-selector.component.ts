import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-rank-selector-component',
  templateUrl: './rank-selector.component.html',
  styleUrls: ['./rank-selector.component.scss']
})
export class RankSelectorComponent implements OnInit {

  @Input() elevationRanks: string[] = []

  @Output() choicedRank: EventEmitter<string> = new EventEmitter<string>()
  rank!: string

  constructor(private router: Router) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && ev.url) {
        this.wichRank("1")
      }
    })
  }

  ngOnInit(): void {
  }

  wichRank(newRank: string) {
    if(newRank === this.rank) return
    this.rank = newRank
    this.choicedRank.emit(this.rank)
  }


}
