import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // getHeroes(): Hero[]{ //Heroはinterface なのになんでarray? -> Heroは１こ、array of objects
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES); //of(HEROES)? -> HEROSがたくさんあるからofを使う ここは普通はapi call
  }
}
