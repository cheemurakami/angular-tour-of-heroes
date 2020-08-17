import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;
  
  constructor() { }

  ngOnInit(): void {
    

  }


  onSelect(hero: Hero): void{ 
    this.selectedHero = hero;
  }
}


// interface FooResponse
// {
//   id: number;
//   name: string;
//   price: number;
// }

//GET  http://localhost:8000/api/price
