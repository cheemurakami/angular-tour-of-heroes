import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //heroes = HEROES;
  heroes: Hero[]; // interfaceのarray -> Heroは１こ、array of objects
  

  selectedHero: Hero;
  
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();

  }


  onSelect(hero: Hero): void{ 
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: selected hero id=${hero.id}`); 
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes); 
  } // heroesはresponseってこと
  
  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }
}


// interface FooResponse
// {
//   id: number;
//   name: string;
//   price: number;
// }

//GET  http://localhost:8000/api/price
