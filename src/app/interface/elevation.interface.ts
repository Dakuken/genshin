import { SafeUrl } from "@angular/platform-browser"
import { Mat } from "./mat.interface"

export interface Elevation {
  "rank": string
  "lvl": string,
  "cost": string,
  "mat1": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl,
    "previous"?: Mat,
    "nbPrevious"?: number,
    "tabPrevious"?: number[]
  },
  "mat4": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl,
    "previous"?: Mat,
    "nbPrevious"?: number,
    "tabPrevious"?: number[]
  },
  "mat2": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl,
    "previous"?: Mat,
    "nbPrevious"?: number,
    "tabPrevious"?: number[]
  },
  "mat3": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl,
    "previous"?: Mat,
    "nbPrevious"?: number,
    "tabPrevious"?: number[]
  }
}
