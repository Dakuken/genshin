import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Elevation} from "../../../interface/elevation.interface";
import {CharactersService} from "../../../service/characters.service";
import {Mat} from "../../../interface/mat.interface";
import {ItemsService} from "../../../service/items.service";
import {imageRef} from "../../../interface/image-ref.interface";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-characters-smart',
  template: `
    <div class="mt-14">
      <app-characters-component
        (choicedRank)="onChoicedRank($event)"
        [character]="character"
        [elevationRanks]="elevationRanks"
        [elevation]="elevationSelected"
        [materials]="materials"
      ></app-characters-component>

    </div>
    <!--      <button nbButton (click)="searchImage()">Pouet</button>-->
  `
})
export class CharactersComponentSmart implements OnInit {

  character: string = ""
  elevations: Elevation[] = []
  elevationRanks: string[] = []
  elevationSelected: Elevation | undefined
  materials: Mat[] = []

  imagePath!: imageRef

  constructor(private characterService: CharactersService, private itemsService: ItemsService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && ev.url) {
        this.character = <string>this.route.snapshot.paramMap.get('id')
        this.reset()
      }
    })
    this.itemsService.getImagePath().subscribe((data: imageRef) => {
      this.imagePath = data
    })
  }

  ngOnInit(): void {
  }

  getElevation() {
    this.characterService.GetElevation(<string>this.character.toLowerCase()).subscribe((data: { items: any }) => {
      this.elevations = data.items
      this.elevationRanks = this.elevations.map(elevation => elevation.rank)
    })
  }

  onChoicedRank(newChoicedRank: string) {
    if (newChoicedRank !== '-1') {
      this.elevationSelected = this.elevations[Number(newChoicedRank) - 1]
      this.materials = [
        this.elevationSelected.mat1,
        this.elevationSelected.mat2,
        this.elevationSelected.mat3,
        this.elevationSelected.mat4,
      ]

      this.materials.forEach(material => {
        this.sanitizeMaterialImage(material)
      })
    } else {
      this.materials = []
    }
  }

  sanitizeMaterialImage(material : Mat){
    if (material.name !== 'none' && material.unsafeUrl === undefined) {
      let [pathName, pathIndex] = this.itemsService.searchImage(material.name)
      material.pathName = pathName
      material.pathIndex = pathIndex
      this.itemsService.getImage(material.pathName.replace('_', '-') + '/' + this.formatItemsName(material.name)).subscribe((response: any) => {
        material.unsafeUrl = window.URL.createObjectURL(response)
        material.url = this.sanitizer.bypassSecurityTrustUrl(material.unsafeUrl);
      })
    }
  }

  formatItemsName(name: string): string {
    const regEspace = new RegExp(' ', 'gi')
    const regPostrophe = new RegExp("'", 'gi')
    name = name.toLowerCase()
    name = name.replace(regEspace, '-').replace(regPostrophe, '-')
    return name
  }


  // Reset se fait la premiere fois tout seul donc pas besoin dans le ngOnInit, vu qu'il est dans le contructor ducoup
  reset() {
    this.elevations = []
    this.elevationSelected = undefined
    this.materials = []
    this.getElevation()
  }
}
