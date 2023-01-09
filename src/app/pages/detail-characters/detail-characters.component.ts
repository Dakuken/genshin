import {Component, OnInit} from '@angular/core';
// import {DomSanitizer} from '@angular/platform-browser';
// import {ActivatedRoute, Router} from '@angular/router';
// import {CharactersService} from '../../service/characters.service';
// import {Mat} from '../../interface/mat.interface';
// import {Elevation} from '../../interface/elevation.interface';
// import {Character} from '../../interface/character.interface';
// import {imageRef} from '../../interface/image-ref.interface';
// import {animate, animateChild, group, query, state, style, transition, trigger,} from '@angular/animations';
// import {ElevationClass} from "../../model/Elevation.class";
// import {MatClass} from "../../model/Mat.class";
//
// @Component({
//   selector: 'app-detail-characters',
//   templateUrl: './detail-characters.component.html',
//   styleUrls: ['./detail-characters.component.scss'],
//   animations: [
//
//     trigger('openClose', [
//       state('open', style({})
//       ),
//       state('closed', style({
//         height: '300px',
//       })),
//       transition('open => closed', [
//         group([query('@child', animateChild()),
//           animate('0.2s ease-out'),]),
//
//       ]),
//
//       transition('closed => open', [
//         group([query('@child', animateChild()),
//           animate('0.2s ease-out'),]),
//       ]),
//
//     ]),
//     trigger('child', [
//       transition(':enter', [
//         style({opacity: 0}),
//         animate('0.2s', style({opacity: 1}),)
//       ]),
//       transition(':leave', [
//         animate('0.2s', style({opacity: 0}),)
//       ]),
//     ]),
//   ],
// })
//
// export class DetailCharactersComponent implements OnInit {

//   selectedOption: string = '-1' //let undefined to start
//   selectedOptionFrom: string = '-1'
//   selectedOptionTo: string = '-1'
//
//   convertFocus: boolean[] = [false, false, false, false];
//
//   nbMat: number[] = []
//
//   elevation: Elevation[] = []
//
//
//   character: string | undefined
//
//   detail?: Character // define OnInit
//
//
//   imagePath?: imageRef  //OnInit
//
//   choicedRank?: Elevation
//   choicedRankMat: Mat[] = []
//
//   choicedRankFrom?: Elevation
//   choicedRankMatFrom: Mat[] = []
//
//   choicedRankTo?: Elevation
//   choicedRankMatTo: Mat[] = []
//
//   inputMainValue = ' '
//   choicedRankFromToObject: Elevation = new ElevationClass()
//
//   common: any
//   commonTab: string[] = []
//
//   choicedRankFromToMatList: Mat[] = []
//   NBchoicedRankFromToMatList: number[] = []
//
//   constructor(private route: ActivatedRoute, private characServ: CharactersService, private router: Router, private sanitizer: DomSanitizer) {
//     this.characServ.GetImagePath().subscribe((data: any) => {
//       this.imagePath = data
//     })
//   }
//
//   async ngOnInit() {
//     const persoId: string | null = this.route.snapshot.paramMap.get('id')
//
//     let isGood = false
//     await this.goodRoute(<string>persoId).then(data =>
//       isGood = data
//     )
//     if (persoId) {
//       this.character = persoId.charAt(0).toUpperCase() + persoId.slice(1);
//     }
//     if (isGood) {
//       await this.toutFaire()
//     }
//   }
//
//   goodRoute(persoId: string): Promise<boolean> {
//     let index = -1
//     return new Promise<boolean>((res) => {
//       this.characServ.GetCharacList().subscribe((data: string[]) => {
//         index = data.indexOf(<string>persoId)
//         if (index === -1) {
//           this.router.navigate(['home']).then(r => console.log(r))
//           res(false)
//         }
//         res(true)
//       })
//     })
//   }
//
//
//   async toutFaire() {
//     await this.oneCarac()
//     await this.getAscensionItem()
//     this.getElevation()
//   }
//
//   construcItem() {
//     for (let i = 0; i <= this.elevation.length - 1; i++) {
//       let elev: Elevation = this.elevation[i]
//       let matElev: Mat[] = [elev.mat1, elev.mat2, elev.mat3, elev.mat4]
//       matElev.forEach((material, index) => {
//         material.qteUser = ' '
//         if (index === 0) {
//           let str = this.prepareName(material.name).toLowerCase()
//           this.characterAscensionConvert(str, material, material)
//         } else if (index === 2) {
//           this.commonAscensionConvert(material)
//         }
//       });
//     }
//
//   }
//
//   prepareName(str: string): string {
//     let newStr = str.split(' ')
//     return newStr[newStr.length - 1]
//   }
//
//   characterAscensionConvert(str: string, mat: Mat, matOrigine: Mat) {
//     let prede = this.hasPrede(str)
//     if (prede === ' ') {
//       return ''
//     }
//     let stre = mat.name.split(' ')
//     stre[stre.length - 1] = prede
//     let name = stre.join(' ')
//
//     if (prede !== ' ') {
//       let pouet = this.searchImage(name.split(' ').join('-'))
//
//
//       let newItem = new MatClass()
//       newItem.name = name
//       newItem.qte = String(Number(mat.qte) * 3)
//       newItem.pathName = pouet.name
//       newItem.pathIndex = pouet.index
//       if (matOrigine.previous === undefined) {
//         matOrigine.previous = []
//       }
//
//
//       this.getOneImg(newItem)
//
//
//       matOrigine.previous?.push(newItem)
//       let str = this.prepareName(newItem.name).toLowerCase()
//       this.characterAscensionConvert(str, newItem, matOrigine)
//     }
//     return
//   }
//
//   hasPrede(str: string): string {
//     const previous: any = {
//       'sliver': '',
//       'fragment': 'Sliver',
//       'chunk': 'Fragment',
//       'gemstone': 'Chunk',
//     }
//
//     return previous[str] ? previous[str] : ' '
//   }
//
//   commonAscensionConvert(material: Mat) {
//     this.commonTab.forEach(key => {
//       (<string[]>this.common[key].characters).forEach(name => {
//         if (name === this.character?.toLowerCase()) {
//           (this.common[key].items).forEach((object: { "id": string, "name": string, "rarity": number }) => {
//             let rar = -1;
//
//             if (object.id === material.name.split(' ').join('-').toLowerCase() && object.rarity !== 1) {
//               rar = object.rarity
//             }
//
//             if (rar !== -1) {
//               let qte = Number(material.qte)
//               for (let i = 0; i < rar - 1; i++) {
//                 let baseMat = this.common[key].items[i]
//                 let pouet = this.searchImage(baseMat.name.split(' ').join('-'))
//                 // console.log(`%c${pouet.name}`, 'color : red');
//                 let qteConver = 0
//                 if (rar === 2) {
//                   qteConver = qte * 3
//                 } else {
//                   if (i === 0) {
//                     qteConver = qte * 9
//                   } else {
//                     qteConver = qte * 3
//                   }
//                 }
//                 let newItem = new MatClass()
//                 newItem.name = baseMat.name
//                 newItem.qte = String(qteConver)
//                 newItem.pathName = pouet.name
//                 newItem.pathIndex = pouet.index
//                 if (material.previous === undefined) {
//                   material.previous = []
//                 }
//                 this.getOneImg(newItem)
//                 material.previous.push(newItem)
//               }
//             }
//           });
//         }
//       })
//     });
//   }
//
//
//   oneCarac() {
//     return new Promise((res) => {
//       this.characServ.GetOneCarac(<string>this.character).subscribe((data: Character) => {
//         this.detail = data
//         res(true)
//       })
//     })
//   }
//
//   getElevation() {
//     return this.characServ.GetElevation(<string>this.character).subscribe((data: { items: any }) => {
//       this.elevation = data.items
//
//       this.getImg()
//       this.wichRank(String(-1))
//       this.construcItem()
//       console.log(this.elevation);
//     })
//   }
//
//   getImg() {
//     const regEspace = new RegExp(' ', 'gi')
//     const regPostrophe = new RegExp("'", 'gi')
//     for (let i = 0; i <= 5; i++) {
//       let materials = [this.elevation[i].mat1, this.elevation[i].mat2, this.elevation[i].mat3, this.elevation[i].mat4]
//
//       for (let y = 0; y <= materials.length - 1; y++) {
//         let name = (materials[y].name).replace(regEspace, '-').replace(regPostrophe, '-')
//         if (name !== 'none') {
//           let item = this.searchImage(name)
//           if (item.name !== 'none') {
//             materials[y].pathName = item.name
//             materials[y].pathIndex = item.index
//             this.characServ.getImage(materials[y].pathName + '/' + name).subscribe((response: any) => {
//               materials[y].unsafeUrl = window.URL.createObjectURL(response)
//             })
//           }
//         }
//       }
//     }
//   }
//
//   getOneImg(mat: Mat) {
//     const regEspace = new RegExp(' ', 'gi')
//     const regPostrophe = new RegExp("'", 'gi')
//     let name = (mat.name).replace(regEspace, '-')
//     name = name.replace(regPostrophe, '-')
//     name = name.toLowerCase()
//     this.characServ.getImage(mat.pathName + '/' + name).subscribe((response: any) => {
//       mat.unsafeUrl = window.URL.createObjectURL(response)
//     })
//   }
//
//
//   searchImage(name: string): { name: string, index: number } {
//     name = name.toLowerCase()
//
//     const skifo = [this.imagePath?.boss_material, this.imagePath?.character_ascension, this.imagePath?.character_experience,
//       this.imagePath?.common_ascension, this.imagePath?.cooking_ingredients, this.imagePath?.local_specialties,
//       this.imagePath?.talent_book, this.imagePath?.talent_boss, this.imagePath?.weapon_ascension,
//       this.imagePath?.weapon_experience]
//     for (let i = 0; i <= skifo.length - 1; i++) {
//       let index: number = <number>skifo[i]?.map((e: any) => e).indexOf(name)
//
//       if (index !== -1) {
//
//         let name2 = this.caseImagePath(i)
//         return {name: name2, index}
//       }
//     }
//     return {name: 'none', index: -1}
//
//   }
//
//   caseImagePath(nb: number): string {
//     const categories: any = {
//       0: 'boss-material',
//       1: 'character-ascension',
//       2: 'character-experience',
//       3: 'common-ascension',
//       4: 'cooking-ingredients',
//       5: 'local-specialties',
//       6: 'talent-book',
//       7: 'talent-boss',
//       8: 'weapon-ascension',
//       9: 'weapon-experience'
//     }
//     return categories[nb] ? categories[nb] : 'none'
//   }
//
//
//   getAscensionItem() {
//     this.common = this.characServ.getCommonAscension()
//   }
//
//
//   wichRank(r: string, option: string = 'one') {
//     switch (option) {
//       case 'one':
//         if (this.selectedOption === r) {
//           return
//         }
//         break;
//
//       case 'from':
//         if (this.selectedOptionFrom === r) {
//           return
//         }
//         break;
//
//       case 'to':
//         if (this.selectedOptionTo === r) {
//           return
//         }
//         break;
//     }
//
//     let tempRank: Elevation | undefined
//     let tempRankMat: Mat[] = []
//     if (option === 'one') {
//       this.nbMat = []
//
//       tempRank = this.elevation[Number(r) - 1];
//       tempRankMat = [
//         tempRank.mat1,
//         tempRank.mat2,
//         tempRank.mat3,
//         tempRank.mat4
//       ]
//
//       let y = 0
//
//       for (let i = 0; i <= 3; i++) {
//         if (tempRankMat[i].name === 'none') {
//           tempRankMat.splice(i, 1)
//         } else {
//           tempRankMat[i].url = this.sanitizer.bypassSecurityTrustUrl(tempRankMat[i].unsafeUrl);
//           if (tempRankMat[i].previous !== undefined) {
//             tempRankMat[i].previous.forEach(prevent => {
//               prevent.url = this.sanitizer.bypassSecurityTrustUrl(prevent.unsafeUrl);
//             });
//           }
//
//           this.nbMat.push(y)
//
//           y++
//
//         }
//       }
//     }
//     if (option === 'one') {
//       this.choicedRank = tempRank
//       this.choicedRankMat = tempRankMat
//     } else if (option === 'from') {
//       this.choicedRankFrom = tempRank
//       this.choicedRankMatFrom = tempRankMat
//     } else if (option === 'to') {
//       this.choicedRankTo = tempRank
//       this.choicedRankMatTo = tempRankMat
//     }
//
//     if (this.choicedRankFrom !== undefined && this.choicedRankTo !== undefined) {
//       if (this.choicedRankFrom.rank <= this.choicedRankTo.rank) {
//         this.calculFromTo()
//
//       } else {
//         this.choicedRankFromToObject.rank = ''
//         this.choicedRankFromToMatList = []
//       }
//
//     } else {
//       this.choicedRankFromToObject.rank = ''
//       this.choicedRankFromToMatList = []
//     }
//
//     this.inputMainValue = '2'
//   }
//
//
//   morasForm(num: any) {
//     return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // copyright pierre bregeard
//   }
//
//   calculFromTo() {
//     this.NBchoicedRankFromToMatList = []
//     this.choicedRankFromToMatList = []
//
//     let matList: Mat[] = []
//     let from = Number(this.choicedRankFrom?.rank)
//     let to = Number(this.choicedRankTo?.rank)
//
//     this.choicedRankFromToObject.cost = '0'
//     let pouet: Elevation[] = JSON.parse(JSON.stringify(this.elevation));
//     for (let i = 0; i <= to - from; i++) {
//       let tempRankMat: Mat[] = []
//
//
//       tempRankMat = [pouet[i].mat1, pouet[i].mat2, pouet[i].mat3, pouet[i].mat4]
//
//
//       for (let y = 0; y < 4; y++) {
//
//         let materials = tempRankMat[y]
//         if (materials.name !== 'none') {
//           let index = matList.map((e) => {
//             return e.name
//           }).indexOf(materials.name)
//
//           if (index === -1) {
//             materials.url = this.sanitizer.bypassSecurityTrustUrl(materials.unsafeUrl);
//             matList.push(materials)
//           }
//           // if exist
//           else {
//             matList[index].qte = String(Number(matList[index].qte) + Number(materials.qte))
//           }
//         }
//       }
//       this.choicedRankFromToObject.cost = String(Number(this.choicedRankFromToObject.cost) + Number(this.elevation[i].cost))
//     }
//     for (let i = 0; i <= matList.length - 1; i++) {
//       this.NBchoicedRankFromToMatList.push(i)
//     }
//
//     //sort per name
//     this.choicedRankFromToMatList = matList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
//
//     //finish
//     this.choicedRankFromToObject.rank = 'done'
//
//   }
//
//   onFocus(nb: number, mat: Mat) {
//     if (mat.previous !== undefined) {
//       if (nb === 0 || nb === 2) {
//         this.convertFocus[nb] = !this.convertFocus[nb]
//       }
//     }
//   }
//
//
// }
//
//
