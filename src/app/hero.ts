import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Hero {
	id: number,
	name: string,
	power: string
}

export interface HeroFormGroup {
	id: FormControl<number | null>;
	name: FormControl<string | null>;
	power: FormControl<string | null>;
}

export interface HeroPartial {
	id: number | null;
	name:  number | null;
	power: number | null;
}
