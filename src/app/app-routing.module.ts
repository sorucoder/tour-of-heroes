import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'create', component: CreateComponent },
	{ path: 'view', component: ViewComponent },
	{ path: 'view/:id', component: ViewComponent },
	{ path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
