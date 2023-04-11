import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Hero, HeroFormGroup } from '../../hero';
import { HeroService } from '../../hero.service';

import { DataValidators } from '../../validators/enumeration-validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	private currentNames!: string[];
	private currentPowers!: string[];

	form!: FormGroup<HeroFormGroup>;
	powerAutocompletes!: Observable<string[]>;

	constructor(
		private router: Router,
		private location: Location,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private heroService: HeroService
	) { }

	get nameControl(): FormControl {
		return this.form.controls.name;
	}

	get powerControl(): FormControl {
		return this.form.controls.power;
	}

	ngOnInit(): void {
		this.heroService.getHeroes().subscribe(currentHeroes => {
			this.initializeCurrentData(currentHeroes);
			this.initializeForm();
		})
	}

	submit(): void {
		const newHero = this.form.getRawValue() as Hero;
		this.heroService.createHero(newHero).subscribe(() => {
			this.resetForm();
			this.updateCurrentData(newHero);
			this.openCreatedSnackBar(newHero);
		});
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

	private initializeForm(): void {
		// Initialize form group
		this.form = this.formBuilder.group({
			id: [{value: 0, disabled: true}],
			name:  ['', Validators.compose([Validators.required, DataValidators.unique(this.currentNames)])],
			power: ['', Validators.required]
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

	private resetForm(): void {
		this.form.reset();
	}

	private initializeCurrentData(currentHeroes: Hero[]): void {
		this.currentNames = currentHeroes.map(hero => hero.name);
		this.currentPowers = currentHeroes.map(hero => hero.power);
	}

	private updateCurrentData(newHero: Hero): void {
		this.currentNames.push(newHero.name);
		if (!this.currentPowers.includes(newHero.power)) {
			this.currentPowers.push(newHero.power);
		}
	}

	private openCreatedSnackBar(newHero: Hero): void {
		let openedSnackBar = this.snackBar.open(`"${newHero.name}" has been saved!`, "VIEW");
		openedSnackBar.onAction().subscribe(() => {
			this.router.navigate(['view', newHero.id]);
		});
	}
}
