import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private character: any;
  private error: string;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.characterService.get(params['id'])
        .subscribe(res => {
          this.character = res;
          console.log(this.character);
        });
    });
  }

}
