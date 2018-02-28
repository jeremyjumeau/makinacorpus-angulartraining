import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CharacterService {
  // private swapi = 'https://swapi.co/api/people/';
  private swapi = 'https://pokeapi.co/api/v2/pokemon/';
  private characters: any = {};

  constructor(
    private http: HttpClient
  ) { }

  getCharacters(): Observable<any[]> {
    if (!this.characters.all) {
      return this.http.get<any>(this.swapi)
        .pipe(
          map(res => {
            this.characters.all = res.results;
            return this.characters.all;
          })
        );
    }

    return of(this.characters.all);
  }

  get(id: string): Observable<any> {
    if (!this.characters[id]) {
      return this.http.get<any>(this.swapi + id + '/')
        .pipe(
          map(character => {
            this.characters[id] = character;

            return character;
          })
        );
    }

    return of(this.characters[id]);
  }
}
