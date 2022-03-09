import { Component } from '@angular/core';
import { PokemonsService } from './services/pokemons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeDev';

newPokemon = {
  name: '',
  image: '',
  type: 'fire',
  hp: 0,
  attack: 0,
  defense: 0,
  idAuthor: 1
};

poke_id : number = -1;
mode: number = 0
viewForm = false;

  public pokemons :  any[] = []
  public pokemonsTemp :  any[] = []
  constructor(private pokemonsService: PokemonsService) {}

    ngOnInit(): void {
      this.getPokemons();
      this.mode = 0;
      this.clearForm();
    }

    clearForm = () => {
      this.newPokemon = {
        name: '',
        image: '',
        type: 'fire',
        hp: 0,
        attack: 0,
        defense: 0,
        idAuthor: 1
      };
    }
  async getPokemons() {
    try {
      const resp = await this.pokemonsService.getPokemon().toPromise();
      this.pokemons = resp;
      this.pokemonsTemp = resp;
    } catch (error) {
      alert('Hubo un error' + error);
    }
  }

  async addPokemon() {
    try {
      const resp = await this.pokemonsService.addPokemon(this.newPokemon).toPromise();
      this.pokemons.push(resp);
      this.clearForm();
      this.pokemonsTemp = this.pokemons;
      this.viewForm = false;
    } catch (error) {
      alert('Hubo un error' + error);
    }

  }
  async deletePokemon(id: number) {
    try {
      if (confirm("Desea eliminar este pokemon?") == true) {
        await this.pokemonsService.deletePokemon(id).toPromise();
        this.pokemons = this.pokemons.filter(p => p.id !== id);
        this.pokemonsTemp = this.pokemons;
      } else {
        alert("Pokemon no eliminado");
      }
    } catch (error) {
      alert('Hubo un error' + error);
    }
  }

  loadPokemon(poke: any) {
    this.viewFormPokemon();

    this.mode = 1;
    this.newPokemon = {
      name: poke.name,
      image: poke.image,
      type: poke.type,
      hp: poke.hp,
      attack: poke.attack,
      defense: poke.defense,
      idAuthor: poke.idAuthor
    };
    this.poke_id = poke.id;
  }

  async updatePokemon() {
    try {
      const resp = await this.pokemonsService.updatePokemon(this.poke_id, this.newPokemon).toPromise();
      this.pokemons = this.pokemons.map(p => p.id === this.poke_id ? resp : p);
      this.pokemonsTemp = this.pokemons;
      this.clearForm();
      this.mode = 0;
      this.viewForm = false;
    } catch (error) {
      alert('Hubo un error' + error);
    }
  }

  search(event: Event){
    const search = (event.target as HTMLInputElement).value;
    this.pokemons = this.pokemonsTemp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  viewFormPokemon() {
    this.viewForm = true;
  }
}