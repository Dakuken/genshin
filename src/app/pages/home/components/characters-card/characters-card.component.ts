import {Component, Input, OnInit} from '@angular/core';
import {CharactersService} from "../../../../service/characters.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'characters-card-component',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss']
})
export class CharactersCardComponent implements OnInit {
  @Input() theme!: string;
  @Input() perso!: string
  url : SafeUrl = ""
  constructor(private characterService : CharactersService, private sanitizer : DomSanitizer) {
  }

  ngOnInit(): void {
     this.characterService.getPortrait(this.perso.toLowerCase()).subscribe(data => {
      let unsafeUrl = window.URL.createObjectURL(data)
      this.url = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
    })

  }

}
