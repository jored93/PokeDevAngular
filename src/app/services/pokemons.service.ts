import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  _url = 'https://pokemon-pichincha.herokuapp.com/pokemons/'

  constructor(
    private http: HttpClient
  ) {
  }

  addPokemon(newPokemon: any){
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
  return this.http.post('https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1', newPokemon, {
    headers: header
  })
  }

  getPokemon() : any{
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
  return this.http.get(this._url, {
    headers: header
  })
  }

  deletePokemon(id: number){
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
  return this.http.delete(this._url + id, {
    headers: header
  })
  }

  updatePokemon(id: number, body: any){
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
  return this.http.put(this._url + id, body, {
    headers: header
  })
  }

}
