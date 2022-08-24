import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../service/characters.service';


@Component({
  selector: 'app-detail-characters',
  templateUrl: './detail-characters.component.html',
  styleUrls: ['./detail-characters.component.scss']
})
export class DetailCharactersComponent implements OnInit {
  selectedOption: any
  selectedOptionFrom: any
  selectedOptionTo: any

  nbMat: number[] = [0, 1, 2, 3]

  elevation: any

  img: { name: string, url: SafeUrl }[] = []

  character: string | undefined

  detail: any

  paramss: any

  imagePath: any

  imagePlaceName: string[] = []

  choicedRank?: any
  choicedRankMat: any[] = []

  choicedRankFrom?: any
  choicedRankMatFrom: any[] = []

  choicedRankTo?: any
  choicedRankMatTo: any[] = []

  choicedRankFromTo = '0'
  // currentRoute: string

  constructor(private route: ActivatedRoute, private characServ: CharactersService, private router: Router, private sanitizer: DomSanitizer) {
    this.characServ.GetImagePath().subscribe((data: any) => {
      this.imagePath = data
      this.imagePlaceName = Object.getOwnPropertyNames(this.imagePath);
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.paramss = data
      this.toutFaire()


      if (this.selectedOption !== undefined)
        setTimeout(() => {

          this.wichRank(this.selectedOption - 1)
        }, 300);
    })
    setTimeout(() => {
      console.log(this.elevation);
      console.log(this.elevation[this.elevation.length - 1]);

      this.selectedOption = this.elevation[this.elevation.length - 1];
    }, 200);
  }

  toutFaire() {



    const persoId: string | null = this.route.snapshot.paramMap.get('id')
    if (persoId) {
      this.character = persoId.charAt(0).toUpperCase() + persoId.slice(1);
    }
    this.oneCarac()
    this.getElevation()
    setTimeout(() => {
      this.getImg()
    }, 200);
  }

  oneCarac() {
    return this.characServ.GetOneCarac(<string>this.character).subscribe((data: {}) => {
      this.detail = data
    })

  }

  getElevation() {
    return this.characServ.GetElevation(<string>this.character).subscribe((data: {}) => {
      this.elevation = data
      this.elevation = this.elevation.items
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
    const skifo = [this.imagePath.boss_material, this.imagePath.character_ascension, this.imagePath.character_experience,
    this.imagePath.common_ascension, this.imagePath.cooking_ingredients, this.imagePath.local_specialties,
    this.imagePath.talent_book, this.imagePath.talent_boss, this.imagePath.weapon_ascension,
    this.imagePath.weapon_experience]

    for (let i = 0; i <= skifo.length - 1; i++) {
      let index: number = skifo[i].map((e: any) => e).indexOf(name)
      if (index !== -1) {
        let name = this.caseImagePath(i)
        // console.log(name, index);
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


  wichRank(pouet: any, option: string = 'one') {
    let tempRank: any
    let tempRankMat: any


    if (pouet === 'none') {
      tempRank = undefined
      tempRankMat = []
    } else {
      tempRank = this.elevation[pouet]
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

    console.log(this.choicedRank, this.choicedRankMat);
    console.log(this.choicedRankFrom, this.choicedRankMatFrom);
    console.log(this.choicedRankTo, this.choicedRankMatTo);


  }

  morasForm(num: number) {
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // copyright pierre bregeard
  }
}
