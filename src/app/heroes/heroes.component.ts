import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //heroes = HEROES;
  heroes: Hero[]; // interfaceのarray -> Heroは１こ、array of objects
  

  selectedHero: Hero;
  
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();

  }


  onSelect(hero: Hero): void{ 
    this.selectedHero = hero;
  }
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes); 
  }
}


// interface FooResponse
// {
//   id: number;
//   name: string;
//   price: number;
// }

//GET  http://localhost:8000/api/price
