import { SafeUrl } from "@angular/platform-browser"

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
    "url": SafeUrl
  },
  "mat4": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl
  },
  "mat2": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl
  },
  "mat3": {
    "name": string,
    "qte": string,
    "pathName": string,
    "pathIndex": number,
    "unsafeUrl": string,
    "url": SafeUrl
  }
}
