import {Component, Input, OnInit} from "@angular/core";
import {Elevation} from "../../../interface/elevation.interface";
import {Mat} from "../../../interface/mat.interface";

@Component({
  selector: 'app-one-rank',
  templateUrl: './one-rank.component.html',
  styleUrls: ['./one-rank.component.scss']
})
export class oneRankComponent implements OnInit {

  @Input() choicedRankMat!: Mat
  @Input() convertFocus!: boolean
  @Input() i!: number
  constructor() {
  }

  ngOnInit(): void {
  }

  handler(e: Event, i: number) {
    this.choicedRankMat.qteUser = (<HTMLInputElement>e.target).value
  }

  handler2(e: Event, mat: Mat, matorigine: Mat) {
    console.log(mat);
    console.log(matorigine);
    console.log(matorigine.previous[0]);
    console.log(mat === matorigine.previous[0]);
    let index = matorigine.previous.indexOf(mat)
    console.log(index);
    this.conversion(matorigine)


    mat.qteUser = (<HTMLInputElement>e.target).value
  }

  conversion(mat: Mat) {
    //? previous.length au moins 1
    console.log(mat)

  }

}
