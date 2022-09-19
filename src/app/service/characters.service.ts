import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://api-genshin1.ey.r.appspot.com/';
// const endpoint = 'http://localhost:8080/';
const token = 'my JWT';
const headers = new HttpHeaders({
  'Content-Type': 'file',
}).set('authorization', 'Bearer ' + token)
@Injectable({
  providedIn: 'root'
})
export class CharactersService {


  constructor(private http: HttpClient) { }
  // Http Headers


  // GET
  GetCharacList(): Observable<any> {
    return this.http.get(endpoint + `characters`)
  }

  GetOneCarac(str: string): Observable<any> {
    return this.http.get(endpoint + `characters/${str}`)
  }

  GetElevation(str: string): Observable<any> {
    return this.http.get(endpoint + `elevation/${str}`)
  }

  GetImage(str: string): Observable<any> {
    return this.http.get(endpoint + `materials/${str}`, { responseType: 'blob' })
  }

  GetImagePath(): Observable<any> {
    return this.http.get(endpoint + `nations/moi`)
  }

  GetCommonAscension(): Observable<any> {
    return this.http.get(endpoint + `materials/common-ascension`)
  }


  searchCharcList(term: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/characters/?name=${term}`)
  }

  errorHandl(error: any) {
    console.log(error);

  }
}
