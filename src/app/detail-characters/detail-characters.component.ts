import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharactersService } from '../service/characters.service';
import { Mat } from '../interface/mat.interface';
import { Elevation } from '../interface/elevation.interface';
import { Character } from '../interface/character.interface';
import { imageRef } from '../interface/image-ref.interface';

@Component({
  selector: 'app-detail-characters',
  templateUrl: './detail-characters.component.html',
  styleUrls: ['./detail-characters.component.scss']
})
export class DetailCharactersComponent implements OnInit {
  selectedOption: number | undefined //let undefined to start
  selectedOptionFrom: number | undefined
  selectedOptionTo: number | undefined

  nbMat: number[] = [0, 1, 2, 3]

  elevation: Elevation[] = []

  img: { name: string, url: SafeUrl }[] = []

  character: string | undefined

  detail?: Character // define OnInit

  routeParams: Params //define OnInit

  imagePath?: imageRef  //OnInit

  imagePlaceName: string[] = []
  characList: string[] = []

  choicedRank?: Elevation
  choicedRankMat: Mat[] = []

  choicedRankFrom?: Elevation
  choicedRankMatFrom: Mat[] = []

  choicedRankTo?: Elevation
  choicedRankMatTo: Mat[] = []

  choicedRankFromTo = false
  choicedRankFromToObject: Elevation = {
    "rank": '',
    "lvl": '',
    "cost": '',
    "mat1": {
      "name": '',
      "qte": '',
      "pathName": '',
      "pathIndex": -1,
      "url": ''
    },
    "mat4": {
      "name": '',
      "qte": '',
      "pathName": '',
      "pathIndex": -1,
      "url": ''
    },
    "mat2": {
      "name": '',
      "qte": '',
      "pathName": '',
      "pathIndex": -1,
      "url": ''
    },
    "mat3": {
      "name": '',
      "qte": '',
      "pathName": '',
      "pathIndex": -1,
      "url": ''
    }
  }
  // currentRoute: string

  constructor(private route: ActivatedRoute, private characServ: CharactersService, private router: Router, private sanitizer: DomSanitizer) {

    this.characServ.GetImagePath().subscribe((data: any) => {
      this.imagePath = data
    })
    this.routeParams = this.route.params
  }

  ngOnInit(): void {

    this.characServ.GetCharacList().subscribe((data: string[]) => {
      this.characList = data
      this.route.params.subscribe((data: Params) => {
        this.routeParams = data

        this.toutFaire()


      })
    })

  }

  toutFaire() {
    const persoId: string | null = this.route.snapshot.paramMap.get('id')
    if (this.characList.indexOf(<string>persoId) === -1) {
      this.router.navigate(['home'])
      return
    }
    if (persoId) {
      this.character = persoId.charAt(0).toUpperCase() + persoId.slice(1);
    }
    this.oneCarac()
    this.getElevation()
  }

  oneCarac() {
    return this.characServ.GetOneCarac(<string>this.character).subscribe((data: Character) => {
      this.detail = data
    })

  }

  getElevation() {
    return this.characServ.GetElevation(<string>this.character).subscribe((data: { items: any }) => {
      this.elevation = data.items
      this.getImg()
      this.selectedOption = this.elevation.length - 1;
      this.wichRank(String(this.selectedOption))
    })
  }

  getImg() {
    const regEspace = new RegExp(' ', 'gi')
    const regPostrophe = new RegExp("'", 'gi')
    for (let i = 0; i <= 5; i++) {
      let materials = [this.elevation[i].mat1, this.elevation[i].mat2, this.elevation[i].mat3, this.elevation[i].mat4]
      for (let i = 0; i <= materials.length - 1; i++) {
        let name = (<string>materials[i].name).replace(regEspace, '-')
        name = name.replace(regPostrophe, '-')
        name = name.toLowerCase()

        if (name !== 'none') {
          let item = this.oukilai(name)
          materials[i].pathName = item.name
          materials[i].pathIndex = item.index
          this.characServ.GetImage(materials[i].pathName + '/' + name).subscribe((response: any) => {
            let UnsafeUrl = window.URL.createObjectURL(response)
            let url = this.sanitizer.bypassSecurityTrustUrl(UnsafeUrl);
            materials[i].url = url
          })
        }
      }
    }
  }


  oukilai(name: string): { name: string, index: number } {
    name = name.toLowerCase()
    const skifo = [this.imagePath?.boss_material, this.imagePath?.character_ascension, this.imagePath?.character_experience,
    this.imagePath?.common_ascension, this.imagePath?.cooking_ingredients, this.imagePath?.local_specialties,
    this.imagePath?.talent_book, this.imagePath?.talent_boss, this.imagePath?.weapon_ascension,
    this.imagePath?.weapon_experience]

    for (let i = 0; i <= skifo.length - 1; i++) {
      let index: number = <number>skifo[i]?.map((e: any) => e).indexOf(name)
      if (index !== -1) {
        let name = this.caseImagePath(i)
        return { name, index }
      }
    }
    return { name: 'none', index: -1 }

  }

  caseImagePath(nb: number): string {
    switch (nb) {
      case 0: return "boss-material"; break;
      case 1: return "character-ascension"; break;
      case 2: return "character-experience"; break;
      case 3: return "common-ascension"; break;
      case 4: return "cooking-ingredients"; break;
      case 5: return "local-specialties"; break;
      case 6: return "talent-book"; break;
      case 7: return "talent-boss"; break;
      case 8: return "weapon-ascension"; break;
      case 9: return "weapon-experience"; break;
      default: return 'none'; break;
    }
  }


  wichRank(r: string, option: string = 'one') {
    let rank = Number(r)
    if (isNaN(rank) || rank < 0) {
      this.selectedOption = -1
      return
    }
    rank = rank - 1
    let tempRank: any
    let tempRankMat: any


    if (rank === -1) {
      tempRank = undefined
      tempRankMat = []
    } else {
      tempRank = this.elevation[rank]
      tempRankMat = [tempRank.mat1, tempRank.mat2, tempRank.mat3, tempRank.mat4]


    }
    if (option === 'one') {
      this.choicedRank = tempRank
      this.choicedRankMat = tempRankMat
    } else if (option === 'from') {
      this.choicedRankFrom = tempRank
      this.choicedRankMatFrom = tempRankMat
    } else if (option === 'to') {
      this.choicedRankTo = tempRank
      this.choicedRankMatTo = tempRankMat
    }
    if (this.choicedRankFrom !== undefined && this.choicedRankTo !== undefined) {
      if (this.choicedRankFrom.rank <= this.choicedRankTo.rank) {
        this.calculFromTo()

      } else {
        this.choicedRankFromToObject.rank = ''
      }

    } else {
      this.choicedRankFromToObject.rank = ''
    }
  }

  morasForm(num: any) {
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // copyright pierre bregeard
  }

  calculFromTo() {
    let from = Number(this.choicedRankFrom?.rank)
    let to = Number(this.choicedRankTo?.rank)
    this.choicedRankFromToObject.cost = '0'
    for (let i = 0; i <= to - from; i++) {
      this.choicedRankFromToObject.cost = String(Number(this.choicedRankFromToObject.cost) + Number(this.elevation[i].cost))
    }
    console.log(this.choicedRankFromToObject.cost);
    this.choicedRankFromToObject.rank = 'done'

  }
}
