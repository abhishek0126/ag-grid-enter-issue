import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

// Material animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatAutocompleteModule
} from "@angular/material";

// AG GRID
import { AgGridModule } from 'ag-grid-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteComponent } from './custom-ag-grid/autocomplete/autocomplete.component';
import { BkPartyRendererSearvice } from './custom-ag-grid/autocomplete/bk-party-renderer.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      AutoCompleteComponent
    ]),
    NgbModule.forRoot(),
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  providers: [BkPartyRendererSearvice],
  bootstrap: [AppComponent]
})
export class AppModule { }
