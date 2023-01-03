import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Elevation} from "../../../interface/elevation.interface";
import {CharactersService} from "../../../service/characters.service";
import {Mat} from "../../../interface/mat.interface";

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
    </div>`
})
export class CharactersComponentSmart implements OnInit {

  character: string = ""
  elevations: Elevation[] = []
  elevationRanks: string[] = []
  elevationSelected: Elevation | undefined
  materials: Mat[] = []

  constructor(private route: ActivatedRoute, private characterService: CharactersService, private router: Router) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && ev.url) {
        this.reset(<string>this.route.snapshot.paramMap.get('id'))
      }
    })
  }

  ngOnInit(): void {
    const persoId: string = <string>this.route.snapshot.paramMap.get('id')
    this.character = persoId.charAt(0).toUpperCase() + persoId.slice(1)
    this.getElevation()
  }

  getElevation() {
    return this.characterService.GetElevation(<string>this.character).subscribe((data: { items: any }) => {
      this.elevations = data.items
      this.elevationRanks = this.elevations.map(elevation => elevation.rank)
      console.log(this.elevations)
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
    }
  }

  reset(name: string) {
    this.character = name.charAt(0).toUpperCase() + name.slice(1)
    this.elevations = []
    this.elevationRanks = []
    this.elevationSelected = undefined
    this.materials = []
    this.getElevation()
  }
}
