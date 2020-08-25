import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; //to catch error

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'  // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

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


  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  getHero(id: number): Observable<Hero>{
    // this.messageService.add(`HeroService: fetched hero id = ${id}`)
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatehero'))
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted heto id =${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  } 

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) {
      return of ([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
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
