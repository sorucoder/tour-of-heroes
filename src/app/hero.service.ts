import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable({
	providedIn: 'root'
})
export class HeroService {
	heroes: Hero[] = [];
	private baseURL = 'api/heroes';
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(
		private http: HttpClient
	) { }

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		}
	}

	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.baseURL).pipe(
			catchError(this.handleError('getHeroes', []))
		);
	}

	getHero(id: number): Observable<Hero> {
		const URL = `${this.baseURL}/${id}`;
		return this.http.get<Hero>(URL).pipe(
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	createHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.baseURL, hero, this.httpOptions).pipe(
			catchError(this.handleError<Hero>('createHero'))
		);
	}

	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.baseURL, hero, this.httpOptions).pipe(
			catchError(this.handleError<any>('updateHero'))
		);
	}

	deleteHero(id: number): Observable<Hero> {
		const URL = `${this.baseURL}/${id}`;
		return this.http.delete<Hero>(URL).pipe(
			catchError(this.handleError<Hero>(`deleteHero id=${id}`))
		)
	}
}
