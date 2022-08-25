import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  @ViewChild('searchBox') searchElement?: ElementRef;
  searchFocus = false;

  searchTerms: string = ''

  charachters: string[] = []

  wichPerso: string = ''

  allCharac: string[] = []

  constructor(private charac: CharactersService, private router: Router) {
    this.getAllCarac()
  }

  ngOnInit(): void {
  }

  onBlur(): void {
    this.searchFocus = false
  }

  onFocus(): void {
    this.searchFocus = true
  }

  getAllCarac() {
    return this.charac.GetCharacList().subscribe((data: {}) => {
      this.allCharac = <string[]>data

    })
  }

  search(term: string) {
    this.charachters = []
    this.searchTerms = term.trim()
    if (this.searchTerms === '') {
      return
    }
    this.allCharac.filter((word, index) => {
      let regex = new RegExp(this.searchTerms, 'gmi')
      if (word.match(regex)) {
        /*you may also store this in a data structure e.g. array*/
        this.charachters.push(word)
        return true;
      } else {
        return false;
      }
    });
  }


  isEmptyOrSpaces(str: string): boolean {
    if (str.match(/^ *$/) !== null) {
      return true;
    }
    return false;
  }

  goToDetail(str: string) {
    const link = ['/characters', str]
    this.router.navigate(link)
    this.searchFocus = false
  }
}
