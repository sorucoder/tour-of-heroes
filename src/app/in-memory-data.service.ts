import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';

@Injectable({
	providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  	createDb() {
		const heroes = [
			{ id: 12, name: 'Dr. Nice', power: 'Gift Generation' },
			{ id: 13, name: 'Bombasto', power: 'Spontaneous Combustion' },
			{ id: 14, name: 'Celeritas', power: 'Superhuman Speed' },
			{ id: 15, name: 'Magneta', power: 'Magnetokinesis' },
			{ id: 16, name: 'RubberMan', power: 'Elasticity' },
			{ id: 17, name: 'Dynama', power: 'Electrokinesis' },
			{ id: 18, name: 'Dr. IQ', power: 'Superhuman Intelligence' },
			{ id: 19, name: 'Magma', power: 'Lavabending' },
			{ id: 20, name: 'Tornado', power: 'Airbending' }
		];
		return {heroes};
	}

	genId(heroes: Hero[]): number {
		return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
	}
}
