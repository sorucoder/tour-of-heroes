// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material imports
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// Other imports
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Application modules
import { AppRoutingModule } from './app-routing.module';

// Application Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';

// Application Dialogs
import { ConfirmDeletionDialog } from './dialogs/confirm-deletion/confirm-deletion-dialog';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent,
    ViewComponent,
    EditComponent,
	ConfirmDeletionDialog
  ],
  imports: [
	AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
	HttpClientModule,
	HttpClientInMemoryWebApiModule.forRoot(
		InMemoryDataService, { dataEncapsulation: false }
	),
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatDividerModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTableModule,
	MatToolbarModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
