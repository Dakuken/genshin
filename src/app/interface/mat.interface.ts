import { SafeUrl } from "@angular/platform-browser";

export interface Mat {
  "name": string,
  "qte": string,
  "pathName": string,
  "pathIndex": number,
  "unsafeUrl": string,
  "url": any,
  "previous": Mat[],
}
