import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('pouet', [
      transition( '*=>*',[
        animate('1s all')

        ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  back: string = "backBody"
  elements: string[] = ["anemo", "electro", "geo", "dendro", 'cryo', 'hydro', 'pyro']

  windowX = window.innerWidth;
  windowY = window.innerHeight;

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.render.addClass(document.body, this.back)
    // this.render.setStyle(document.body, "background", "-webkit-radial-gradient(10% 100%, rgba(175,225,255,1) 0, rgba(43,116,165,1)0,rgba(5,57,91,1) 100%")
    // this.type()
  }

  backdefou(e : any){
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let pourcentX = e.clientX * 100 / this.windowX
    let pourcentY = e.clientY * 100 / this.windowY
    // this.render.setStyle(document.querySelector("#mouse"), "background", `-webkit-radial-gradient(${pourcentX}% ${pourcentY}%, circle, rgba(175,225,255,1) 0, rgba(43,116,165,0.2) 15%, rgba(5,57,91,0.2) 12%`)
    this.render.setStyle(document.querySelector("#mouse"), "left", `${pourcentX}%`)
    this.render.setStyle(document.querySelector("#mouse"), "top", `${pourcentY}%`)
  }
  ngOnDestroy() {
    this.render.removeClass(document.body, this.back)
  }

  async type() {
    while(true) {
      for (let i = 0; i < this.elements.length; i++) {
        this.render.addClass(document.body, this.elements[i]);
        await this.sleep(5000);
        this.render.removeClass(document.body, this.elements[i]);
      }
    }
  }

  sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }





}

