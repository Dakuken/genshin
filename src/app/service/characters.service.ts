import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import CommonAscencion from "../model/Ascencion/Common/CommonAscencion";

const endpoint = 'https://api-genshin.justinburnel.repl.co/';
// const endpoint = 'http://localhost:8080/';
const token = 'my JWT';
const headers = new HttpHeaders({
  'Content-Type': 'file',
}).set('authorization', 'Bearer ' + token)

@Injectable({
  providedIn: 'root'
})
export class CharactersService {


  constructor(private http: HttpClient) {
  }

  // Http Headers


  // GET
  GetCharacList(): Observable<any> {
    return this.http.get(endpoint + `characters`)
  }

  GetOneCarac(str: string): Observable<any> {
    console.log(endpoint + `characters/${str}`)
    return this.http.get(endpoint + `characters/${str}`)
  }

  GetElevation(str: string): Observable<any> {
    return this.http.get(endpoint + `elevation/${str}`)
  }

  getImage(str: string): Observable<any> {
    return this.http.get(endpoint + `materials/${str}`, {responseType: 'blob'})
  }

  GetImagePath(): Observable<any> {
    return this.http.get(endpoint + `nations/moi`)
  }

  async getCommonAscension(): Promise<CommonAscencion> {
    return new Promise((res) => {
      this.http.get(endpoint + `materials/common-ascension`).subscribe((data: any) => {
        let d: any = data
        let pouet = Object.keys(data)
        pouet.forEach(item => {
          if (d[item].weapons !== undefined) {
            delete d[item]
          }
        })
        res(d as CommonAscencion)
      })
    })
  }

  searchCharcList(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint}characters/?name=${term}`)
  }

  getPortrait(name : string ){
    return this.http.get(`${endpoint}characters/${name}/portrait`,{responseType: 'blob'})
  }



  errorHandl(error: any) {
    console.log(error);

  }
}
