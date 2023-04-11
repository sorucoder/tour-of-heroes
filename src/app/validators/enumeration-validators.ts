import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// https://github.com/angular/angular/blob/e78a2a4a47be4dfb3934e51611ad20613836b9c8/packages/forms/src/validators.ts#L19
function isEmptyInputValue(value: any): boolean {
	return value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

export class DataValidators {
	static unique(values: string[]): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;
			if (isEmptyInputValue(value)) {
				return null;
			}
			return values.includes(value) ? {'unique': true} : null;
		}
	}
}