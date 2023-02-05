import {Component, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'genshin';

  constructor(private render: Renderer2, private router: Router) {
  }
}
