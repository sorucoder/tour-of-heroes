import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Hero } from "src/app/hero";

@Component({
	selector: 'confirm-deletion-dialog',
	templateUrl: 'confirm-deletion-dialog.html'
})
export class ConfirmDeletionDialog {
	constructor (
		private openDialog: MatDialogRef<ConfirmDeletionDialog>,
		@Inject(MAT_DIALOG_DATA) public hero: Hero
	) {}
}