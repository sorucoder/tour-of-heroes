import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDeletionDialog } from 'src/app/dialogs/confirm-deletion/confirm-deletion-dialog';

import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
	hero!: Hero | null;
	heroes!: Hero[] | null;
	heroesDataSource!: MatTableDataSource<Hero>;
	columns = ['id', 'name', 'power', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private heroesService: HeroService
	) { }

	ngOnInit(): void {
		const paramMap = this.route.snapshot.paramMap;
		if (paramMap.has('id')) {
			const id = Number(paramMap.get('id'));
			this.heroesService.getHero(id).subscribe(hero => {
				this.hero = hero;
			})
		} else {
			this.heroesService.getHeroes().subscribe(heroes => {
				this.heroes = heroes;
				this.heroesDataSource = new MatTableDataSource<Hero>(this.heroes);
			})
		}
	}

	confirmDeletion(deletedHero: Hero): void {
		const openDialog = this.dialog.open(ConfirmDeletionDialog, {data: deletedHero});
		openDialog.afterClosed().subscribe(confirm => {
			if (confirm) {
				this.heroesService.deleteHero(deletedHero.id).subscribe(() => {
					if (this.heroes) {
						this.updateHeroes(this.heroes.filter(hero => hero.id !== deletedHero.id));
					} else {
						this.view();
					}
					this.openDeletedSnackbar(deletedHero);
				})
			}
		})
	}

	private updateHeroes(heroes: Hero[]): void {
		this.heroes = heroes;
		this.heroesDataSource.data = heroes;
	}

	private openDeletedSnackbar(deletedHero: Hero): void {
		const openedSnackBar = this.snackBar.open(`"${deletedHero.name}" was deleted!`, "UNDO");
		openedSnackBar.onAction().subscribe(() => {
			this.heroesService.createHero(deletedHero).subscribe(createdHero => {
				if (this.heroes) {
					this.updateHeroes([createdHero, ...this.heroes].sort((leftHero, rightHero) => Math.sign(leftHero.id - rightHero.id)));
				} else {
					this.view(deletedHero.id);
				}
			});
		})
	}

	view(id?: number): void {
		if (id) {
			this.router.navigate(['view', id]);
		} else {
			this.router.navigateByUrl('/view');
		}
	}

	back(): void {
		this.location.back();
	}
}
