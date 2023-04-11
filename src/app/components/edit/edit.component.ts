import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DataValidators } from '../../validators/enumeration-validators';

import { Hero, HeroFormGroup, HeroPartial } from '../../hero';
import { HeroService } from '../../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	private currentNames!: string[];
	private currentPowers!: string[];
	
	title!: string;
	form!: FormGroup<HeroFormGroup>;
	powerAutocompletes!: Observable<string[]>;

	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private heroService: HeroService
	) {}

	get nameControl(): FormControl {
		return this.form.controls.name;
	}

	get powerControl(): FormControl {
		return this.form.controls.power;
	}
	
	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.heroService.getHeroes().subscribe(heroes => {
			const workingHero = heroes.find(hero => hero.id === id);
			if (workingHero) {
				this.initializeCurrentData(heroes.filter(hero => hero.id !== id));
				this.initializeForm(workingHero);
			}
		});
	}

	submit(): void {
		const updatedHero = this.form.getRawValue() as Hero;
		this.heroService.updateHero(updatedHero).subscribe(() => {
			this.updateCurrentData(updatedHero);
			this.openUpdatedSnackBar(updatedHero);
		})
	}

	back(): void {
		this.location.back();
	}

	getNameFeedback(): string {
		if (this.nameControl.hasError('required')) {
			return 'A name is required.';
		} else if (this.nameControl.hasError('unique')) {
			return `"${this.nameControl.value}" already exists.`;
		}
		return '';
	}

	getPowerFeedback(): string {
		if (this.powerControl.hasError('required')) {
			return 'A power is required';
		}
		return '';
	}

	private initializeCurrentData(currentHeroes: Hero[]): void {
		this.currentNames = currentHeroes.map(hero => hero.name);
		this.currentPowers = currentHeroes.map(hero => hero.power);
	}

	private updateCurrentData(updatedHero: Hero) {
		this.title = `Edit ${updatedHero.name}`;
	}

	private initializeForm(workingHero: Hero): void {
		// Initialize title
		this.title = `Edit ${workingHero.name}`;

		// Initialize form
		this.form = this.formBuilder.group({
			id:    [{value: workingHero.id, disabled: true}],
			name:  [workingHero.name, [Validators.required, DataValidators.unique(this.currentNames)]],
			power: [workingHero.power, [Validators.required]]
		});

		// Initialize power autocompletion
		const powerFormControl = this.form.controls.power;
		this.powerAutocompletes = powerFormControl.valueChanges.pipe(
			startWith(''),
			map(rawValue => {
				const value = rawValue ? rawValue.toLowerCase() : '';
				return this.currentPowers.filter(power => power.toLowerCase().includes(value));
			})
		);
	}

	private openUpdatedSnackBar(updatedHero: Hero): void {
		let openSnackBar = this.snackBar.open(`"${updatedHero.name}" saved!`, "VIEW");
		openSnackBar.onAction().subscribe(() => {
			this.router.navigate(['view', updatedHero.id]);
		})
	}
}
