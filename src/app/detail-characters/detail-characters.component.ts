import { Component, OnInit, ɵɵclassMapInterpolate1 } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharactersService } from '../service/characters.service';
import { Mat } from '../interface/mat.interface';
import { Elevation } from '../interface/elevation.interface';
import { Character } from '../interface/character.interface';
import { imageRef } from '../interface/image-ref.interface';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-detail-characters',
  templateUrl: './detail-characters.component.html',
  styleUrls: ['./detail-characters.component.scss'],
  animations: [

    trigger('openClose', [
      state('open', style({
      })
      ),
      state('closed', style({
        height: '300px',
      })),
      transition('open => closed', [
        group([query('@child', animateChild()),
        animate('0.2s ease-out'),]),

      ]),

      transition('closed => open', [
        group([query('@child', animateChild()),
        animate('0.2s ease-out'),]),
      ]),

    ]),
    trigger('child', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 }),)
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }),)
      ]),
    ]),
  ],
})

export class DetailCharactersComponent implements OnInit {

  selectedOption: string = '-1' //let undefined to start
  selectedOptionFrom: string = '-1'
  selectedOptionTo: string = '-1'


  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  convertFocus: boolean[] = [false, false, false, false];

  nbMat: number[] = []

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

  inputMainValue = '0'

  choicedRankFromTo = false
  choicedRankFromToObject: Elevation = {
    "rank": '',
    "lvl": '',
    "cost": '',
    "mat1": {
      "name": '',
      "qte": '',
      "qteUser": '0',
      "pathName": '',
      "pathIndex": -1,
      "unsafeUrl": '',
      "url": '',
      "previous": []
    },
    "mat4": {
      "name": '',
      "qte": '',
      "qteUser": '0',
      "pathName": '',
      "pathIndex": -1,
      "unsafeUrl": '',
      "url": '',
      "previous": []
    },
    "mat2": {
      "name": '',
      "qte": '',
      "qteUser": '0',
      "pathName": '',
      "pathIndex": -1,
      "unsafeUrl": '',
      "url": '',
      "previous": []
    },
    "mat3": {
      "name": '',
      "qte": '',
      "qteUser": '0',
      "pathName": '',
      "pathIndex": -1,
      "unsafeUrl": '',
      "url": '',
      "previous": []
    }
  }

  matVierge = {
    "name": '',
    "qte": '',
    "pathName": '',
    "pathIndex": '',
    "unsafeUrl": '',
    "url": '',
    "previous": ''
  }

  common: any
  commonTab: string[] = []

  choicedRankFromToMatList: Mat[] = []
  NBchoicedRankFromToMatList: number[] = []

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
    this.prepareCommonAscension()
    this.getElevation()



  }

  construcItem() {

    for (let i = 0; i <= this.elevation.length - 1; i++) {
      let elev: Elevation = this.elevation[i]
      let matElev: Mat[] = [elev.mat1, elev.mat2, elev.mat3, elev.mat4]
      matElev.forEach((material, index) => {
        material.qteUser = '0'
        if (index === 0) {
          let str = this.prepareName(material.name).toLowerCase()
          this.characterAscensionConvert(str, material, material)
        } else if (index === 2) {
          this.commonAscensionConvert(material)
        }
      });
    }

  }

  prepareName(str: string): string {
    let newStr = str.split(' ')
    return newStr[newStr.length - 1]
  }

  characterAscensionConvert(str: string, mat: Mat, matOrigine: Mat) {
    let prede = this.hasPrede(str)
    if (prede === ' ') {
      return ''
    }
    let stre = mat.name.split(' ')
    stre[stre.length - 1] = prede
    let name = stre.join(' ')

    if (prede !== ' ') {
      let pouet = this.oukilai(name.split(' ').join('-'))

      let newItem: Mat = {
        "name": name,
        "qte": String(Number(mat.qte) * 3),
        "qteUser": '0',
        "pathName": pouet.name,
        "pathIndex": pouet.index,
        "unsafeUrl": '',
        "url": '',
        "previous": []
      }
      if (matOrigine.previous === undefined) {
        matOrigine.previous = []
      }


      this.getOneImg(newItem)


      matOrigine.previous?.push(newItem)
      let str = this.prepareName(newItem.name).toLowerCase()
      this.characterAscensionConvert(str, newItem, matOrigine)
    }
    return
  }
  hasPrede(str: string): string {
    switch (str) {
      case 'sliver': return ' '; break;
      case 'fragment': return 'Sliver'; break;
      case 'chunk': return 'Fragment'; break;
      case 'gemstone': return 'Chunk'; break;
    }

    return ' '
  }
  commonAscensionConvert(material: Mat) {

    this.commonTab.forEach(key => {
      (<string[]>this.common[key].characters).forEach(name => {
        if (name === this.character?.toLowerCase()) {
          (this.common[key].items).forEach((object: { "id": string, "name": string, "rarity": number }, index: number) => {
            let rar = -1;

            if (object.id === material.name.split(' ').join('-').toLowerCase() && object.rarity !== 1) {
              rar = object.rarity
            }

            if (rar !== -1) {
              let qte = Number(material.qte)
              for (let i = 0; i < rar - 1; i++) {
                let baseMat = this.common[key].items[i]
                let pouet = this.oukilai(baseMat.name.split(' ').join('-'))
                let newItem: Mat = {
                  "name": baseMat.name,
                  "qte": (i === 0) ? String(qte * 9) : String(qte * 3),
                  "qteUser": '0',
                  "pathName": pouet.name,
                  "pathIndex": pouet.index,
                  "unsafeUrl": '',
                  "url": '',
                  "previous": []
                }
                if (material.previous === undefined) {
                  material.previous = []
                }
                this.getOneImg(newItem)
                material.previous.push(newItem)

              }
            }
          });
        }
      })
    });
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
      this.wichRank(String(-1))
      this.construcItem()
      console.log(this.elevation);
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
          if (item.name !== 'none') {

            materials[i].pathName = item.name
            materials[i].pathIndex = item.index
            this.characServ.GetImage(materials[i].pathName + '/' + name).subscribe((response: any) => {
              let UnsafeUrl = window.URL.createObjectURL(response)
              materials[i].unsafeUrl = UnsafeUrl
            })
          }
        }
      }
    }
  }

  getOneImg(mat: Mat) {
    const regEspace = new RegExp(' ', 'gi')
    const regPostrophe = new RegExp("'", 'gi')
    let name = (mat.name).replace(regEspace, '-')
    name = name.replace(regPostrophe, '-')
    name = name.toLowerCase()
    this.characServ.GetImage(mat.pathName + '/' + name).subscribe((response: any) => {
      let UnsafeUrl = window.URL.createObjectURL(response)
      mat.unsafeUrl = UnsafeUrl
    })
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

        let name2 = this.caseImagePath(i)
        return { name: name2, index }
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

  prepareCommonAscension() {
    this.characServ.GetCommonAscension().subscribe((data: Object) => {
      this.common = data
      this.commonTab = Object.keys(this.common)
      //? to remove unused weapons items
      this.commonTab.forEach(item => {
        if (this.common[item].weapons !== undefined) {
          delete this.common[item]
        }
      });
      this.commonTab = Object.keys(this.common)
      console.table(this.commonTab)
    })

  }


  wichRank(r: string, option: string = 'one') {
    switch (option) {
      case 'one': if (this.selectedOption === r) { return }; break;
      case 'from': if (this.selectedOptionFrom === r) { return }; break;
      case 'to': if (this.selectedOptionTo === r) { return }; break;
    }

    let tempRank: Elevation | undefined
    let tempRankMat: Mat[]
    if (r === '-1') {
      tempRank = undefined
      tempRankMat = []
    } else {
      if (option === 'one') {
        this.nbMat = []
      }

      tempRank = this.elevation[Number(r) - 1];
      tempRankMat = [(<Elevation>this.elevation[Number(r) - 1]).mat1, (<Elevation>this.elevation[Number(r) - 1]).mat2, (<Elevation>this.elevation[Number(r) - 1]).mat3, (<Elevation>this.elevation[Number(r) - 1]).mat4]
      console.log(tempRankMat, 'tempRankMat');

      console.log(tempRank, 'tempRank');
      console.log(this.elevation, 'elevation');



      let y = 0

      for (let i = 0; i <= 3; i++) {
        if (tempRankMat[i].name === 'none') {
          tempRankMat.splice(i, 1)
        } else {
          tempRankMat[i].url = this.sanitizer.bypassSecurityTrustUrl(tempRankMat[i].unsafeUrl);
          if (tempRankMat[i].previous !== undefined) {
            tempRankMat[i].previous.forEach(prevent => {
              prevent.url = this.sanitizer.bypassSecurityTrustUrl(prevent.unsafeUrl);
            });
          }
          if (option === 'one') {
            this.nbMat.push(y)
          }
          y++

        }
      }

    }
    // tempRankMat[0].qteUser = "10000"
    console.log(tempRank, 'tempRank');


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
        this.choicedRankFromToMatList = []
      }

    } else {
      this.choicedRankFromToObject.rank = ''
      this.choicedRankFromToMatList = []
    }

    this.inputMainValue = '2'
  }



  morasForm(num: any) {
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // copyright pierre bregeard
  }

  calculFromTo() {
    this.NBchoicedRankFromToMatList = []
    this.choicedRankFromToMatList = []

    let matList: Mat[] = []
    let from = Number(this.choicedRankFrom?.rank)
    let to = Number(this.choicedRankTo?.rank)

    this.choicedRankFromToObject.cost = '0'
    let pouet: Elevation[] = JSON.parse(JSON.stringify(this.elevation));
    for (let i = 0; i <= to - from; i++) {
      let tempRankMat: Mat[] = []


      tempRankMat = [pouet[i].mat1, pouet[i].mat2, pouet[i].mat3, pouet[i].mat4]


      for (let y = 0; y < 4; y++) {

        let materials = tempRankMat[y]
        if (materials.name !== 'none') {
          let index = matList.map((e) => { return e.name }).indexOf(materials.name)

          //if don't exist
          if (index === -1) {
            materials.url = this.sanitizer.bypassSecurityTrustUrl(materials.unsafeUrl);
            matList.push(materials)
          }
          // if exist
          else {
            matList[index].qte = String(Number(matList[index].qte) + Number(materials.qte))
          }
        }
      }
      this.choicedRankFromToObject.cost = String(Number(this.choicedRankFromToObject.cost) + Number(this.elevation[i].cost))
    }
    for (let i = 0; i <= matList.length - 1; i++) {
      this.NBchoicedRankFromToMatList.push(i)
    }

    //sort per name
    this.choicedRankFromToMatList = matList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    //finish
    this.choicedRankFromToObject.rank = 'done'

  }

  onFocus(nb: number, mat: Mat) {
    if (mat.previous !== undefined) {
      if (nb === 0 || nb === 2) {
        this.convertFocus[nb] = !this.convertFocus[nb]
      }
    }
  }

  qte(mat: Mat, nb: number | null) {
    if (nb === null) {
      mat.qteUser = '0'
      return
    }
    mat.qteUser = String(nb)

  }

  handler(e: Event, i: number) {
    this.choicedRankMat[i].qteUser = (<HTMLInputElement>e.target).value

  }
}


