import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {imageRef} from "../interface/image-ref.interface";

const endpoint = 'https://api-genshin.justinburnel.repl.co/';
// const endpoint = 'http://localhost:8080/';
const token = 'my JWT';
const headers = new HttpHeaders({
  'Content-Type': 'file',
}).set('authorization', 'Bearer ' + token)
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  imagePath!: imageRef

  constructor(private http: HttpClient) {
    this.getImagePath().subscribe((data: imageRef) => {
      this.imagePath = data
    })
  }

  getImagePath(): Observable<any> {
    return this.http.get(endpoint + `nations/moi`)
  }

  getImage(str: string): Observable<any> {
    return this.http.get(endpoint + `materials/${str}`, { responseType: 'blob' })
  }

  searchImage(materialName: string) {
    // [category, index in category]
    let imagePlace: [string, number] = ['', -1]
    materialName = this.formatItemsName(materialName)
    Object.entries(this.imagePath).forEach(([key, value]: [string, string[]]) => {
      if (imagePlace[1] === -1) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === materialName) {
            imagePlace[0] = key
            imagePlace[1] = i
            break
          }
        }
      }
    })
    return imagePlace
  }

  getElementsIcon(name: string) {
    return this.http.get(`${endpoint}elements/${name}/icon-trans`, {responseType: 'blob'})
  }
  formatItemsName(name: string): string {
    const regEspace = new RegExp(' ', 'gi')
    const regPostrophe = new RegExp("'", 'gi')
    name = name.toLowerCase()
    name = name.replace(regEspace, '-').replace(regPostrophe, '-')
    return name
  }
}
