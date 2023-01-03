import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-characters-component',
  templateUrl: './characters.dumb.html',
  styleUrls: ['./characters.dumb.scss']
})
export class CharactersDumb implements OnInit {
  @Input() character!: string
  constructor() { }

  ngOnInit(): void {
  }

}
