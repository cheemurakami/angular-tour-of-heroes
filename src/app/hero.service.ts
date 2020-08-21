import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; //to catch error

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
    // return of(); //of(HEROES)? -> HEROSがたくさんあるからofを使う ここは普通はapi call
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id = ${id}`)
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  // * 失敗したHttp操作を処理します。
  // * アプリを持続させます。
  // * @param operation - 失敗した操作の名前
  // * @param result - observableな結果として返す任意の値
  private handleError<T>(operation = 'operation', result?: T){ //Tって何
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of (result as T);
    }
  }
}
