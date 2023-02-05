import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../service/characters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  @ViewChild('searchBox') searchElement?: ElementRef;
  searchFocus = false;
  searchFocusInput = false

  searchTerms: string = ''

  charachters: string[] = []

  wichPerso: string = ''

  allCharac: string[] = []
  input = ''

  constructor(private charac: CharactersService, private router: Router) {
    this.getAllCarac()


  }

  ngOnInit(): void {

  }

  onBlur(str: string = 'base'): void {
    if (str !== 'base') {
      this.searchFocusInput = false
      return
    }
    this.searchFocus = false

  }

  onFocus(str: string = 'base'): void {
    if (str !== 'base') {
      this.searchFocusInput = true
      return
    }
    this.searchFocus = true
  }

  getAllCarac() {
    return this.charac.getCharacList().subscribe((data: {}) => {
      this.allCharac = <string[]>data
      this.charachters = this.allCharac
    })
  }

  search(term: string, base: boolean = false) {
    this.charachters = []
    if (base === true) {
      this.charachters = this.allCharac
    }
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
    this.searchFocusInput = false;
    (<ElementRef>this.searchElement).nativeElement.value = ''

  }
}
