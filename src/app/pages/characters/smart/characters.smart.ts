import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-characters-smart',
  template: `
      <app-characters-component
        [character]="character"

      ></app-characters-component>`,
})
export class CharactersComponentSmart implements OnInit {

  character : string = ""
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const persoId: string = <string>this.route.snapshot.paramMap.get('id')
    console.log(this.character)
    this.character = persoId.charAt(0).toUpperCase() + persoId.slice(1)
  }



}
