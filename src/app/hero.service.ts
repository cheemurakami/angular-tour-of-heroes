import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'  // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  // getHeroes(): Hero[]{ //Heroはinterface なのになんでarray? -> Heroは１こ、array of objects
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    // 普通はreturn of(HEROES)の前にGET REQUESTとかfetchしてるからここにメソッドを置く
    this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES); //of(HEROES)? -> HEROSがたくさんあるからofを使う ここは普通はapi call
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id = ${id}`)
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
