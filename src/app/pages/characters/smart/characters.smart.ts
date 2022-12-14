import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Elevation} from "../../../interface/elevation.interface";
import {CharactersService} from "../../../service/characters.service";
import {Mat} from "../../../interface/mat.interface";
import {ItemsService} from "../../../service/items.service";
import {imageRef} from "../../../interface/image-ref.interface";
import {DomSanitizer} from "@angular/platform-browser";
import {ConverterClass} from "../../../model/Converter.class";
import Ascencion from "../../../model/Ascencion/Common/CommonAscencion";
import CharacterAscension from "../../../model/Ascencion/Characters/CharacterAscension";
import {MatClass} from "../../../model/Mat.class";

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
        [converter]="conversion"
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
  conversion: ConverterClass = new ConverterClass()
  commonAscencionInfo!: Ascencion
  characterAscencionInfo: CharacterAscension = new CharacterAscension()

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
      this.necessaryConversion(this.materials)
    } else {
      this.materials = []
    }
  }

  sanitizeMaterialImage(material: Mat) {
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

  necessaryConversion(mat: Mat[]) {
    let mat1: Mat[] = []
    let mat2: Mat[] = []
    mat1 = this.charactersPrevious(mat[0])
    mat2 = this.commonPrevious(mat[2])
    this.conversion.mat1 = mat1
    this.conversion.mat2 = mat2
    console.log(this.conversion)
  }

  charactersPrevious(material: Mat): Mat[] {
    let tempName = material.name.split(' ')
    let matName = tempName.splice(0, tempName.length - 1).join('-').toLowerCase()
    let materialLevel = tempName[tempName.length - 1].toLowerCase()
    let i = this.characterAscencionInfo.material.indexOf(materialLevel)
    let materialsName = [...this.characterAscencionInfo.material].splice(0, i)
    let materials: Mat[] = []
    materialsName.forEach(material => {
      let mat = new MatClass()
      mat.name = `${matName}-${material}`
      this.sanitizeMaterialImage(mat)
      materials.push(mat)
    })
    if (i === 0) {
      return []
    }
    //obliger pouer pas avoir la meme ref
    let temps = Object.assign({},material)
    temps.qte = ""
    //besoin pour s??curit??
    this.sanitizeMaterialImage(temps)
    materials.push(temps)

    return materials
  }

  commonPrevious(material: Mat): Mat[] {
    let commonAscencionInfoProperties = [this.commonAscencionInfo.handguard, this.commonAscencionInfo.nectar, this.commonAscencionInfo.slime,
      this.commonAscencionInfo.spectral, this.commonAscencionInfo["fatui-insignias"], this.commonAscencionInfo["hilichurl-arrowheads"],
      this.commonAscencionInfo["hilichurl-masks"], this.commonAscencionInfo["samachurl-scrolls"], this.commonAscencionInfo["treasure-hoarder-insignias"]]
    let isFinish = false
    let materials: Mat[] = []
    for (let i = 0; i < commonAscencionInfoProperties.length; i++) {
      let ascenscionInfo = commonAscencionInfoProperties[i]
      for (let j = 0; j < ascenscionInfo.items.length; j++) {
        let item = ascenscionInfo.items[j]
        if (material.name === item.name) {
          for (let k = 0; k < j; k++) {
            let mat = new MatClass()
            mat.name = ascenscionInfo.items[k].name
            this.sanitizeMaterialImage(mat)
            materials.push(mat)
          }
          isFinish = true
        }
        if (isFinish) break
      }
      if (isFinish) break
    }
    return materials
  }


  // Reset se fait la premiere fois tout seul donc pas besoin dans le ngOnInit, vu qu'il est dans le contructor ducoup
  async reset() {
    this.elevations = []
    this.elevationSelected = undefined
    this.materials = []
    this.conversion = new ConverterClass()
    this.commonAscencionInfo = await this.characterService.getCommonAscension()
    this.getElevation()

  }
}
