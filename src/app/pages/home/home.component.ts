import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {ItemsService} from "../../service/items.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CharactersService} from "../../service/characters.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  back: string = "backBody"
  newPerso: string[] = ["alhaitham", "yaoyao", "scaramouche", "faruzan"]
  type: string[] = ["dendro", "dendro", 'anemo', "anemo"]

  charactersList: { characters: string, element: string }[] = []
  charactersListSorted: { characters: string, element: string }[][] = []
  //0 = pyro
  elements: { element: string, image: SafeUrl }[] = [
    {element: "anemo", image: ""}, {element: "cryo", image: ""}, {element: "dendro", image: ""},
    {element: "electro", image: ""}, {element: "geo", image: ""}, {element: "hydro", image: ""},
    {element: "pyro", image: ""}
  ]


  constructor(private render: Renderer2, private router: Router, private itemsService: ItemsService, private characService: CharactersService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    this.render.addClass(document.body, this.back)
    this.getElementsImage()
    await this.getCharactersInfo()
    console.log(this.charactersList)
  }


  getElementsImage() {
    this.elements.forEach(el => {
      this.itemsService.getElementsIcon(el.element).subscribe(res => {
        let url = window.URL.createObjectURL(res)
        el.image = this.sanitizer.bypassSecurityTrustUrl(url)
      })
    })
  }

  async getCharactersInfo() {
    let characList: string[] = []
    this.characService.getCharacList().subscribe(res => {
      characList = res;
      this.getCharactersElement(characList)
    })

  }

  async getCharactersElement(characList: string[]) {
    this.characService.getAllCharacWithElement().subscribe((res: any) => {
      this.charactersList = res.characters;
      const pyro : { characters: string, element: string }[]= [];
      const electro : { characters: string, element: string }[]= [];
      const cryo : { characters: string, element: string }[]= [];
      const hydro : { characters: string, element: string }[]= [];
      const anemo : { characters: string, element: string }[]= [];
      const geo : { characters: string, element: string }[]= [];
      const dendro : { characters: string, element: string }[]= [];
      this.charactersList.forEach(el => {
        switch (el.element.toLowerCase()) {
          case "pyro":
            pyro.push(el);
            break;
          case "electro":
            electro.push(el);
            break;
          case "cryo":
            cryo.push(el);
            break;
          case "hydro":
            hydro.push(el);
            break;
          case "anemo":
            anemo.push(el);
            break;
          case "geo":
            geo.push(el);
            break;
          case "dendro":
            dendro.push(el);
            break;
          default:
            break;
        }
      })
      this.charactersListSorted = [anemo,cryo,dendro,electro,geo,hydro,pyro]
    })

  }

  ngOnDestroy() {
    this.render.removeClass(document.body, this.back)
  }

  sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  goTo(perso: string) {
    this.router.navigate(["characters", perso])
  }
}

