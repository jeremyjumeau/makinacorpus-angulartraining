import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../character.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() message: string;
  private characters: any[];
  private sprites = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/';

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  changeMessage() {
    this.message = 'This is a new message';
  }

  getClasses(character: any) {
    return {
      strong: 100 < character.weight
    };
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(res => {
      this.characters = res.map(item => {
        return {
          id: item.url.split('/').reverse()[1],
          name: item.name,
          avatar: this.sprites + item.url.split('/').reverse()[1] + '.png'
        };
      });
    });
  }
}
