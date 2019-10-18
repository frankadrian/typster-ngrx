import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material';
import { TypeTestComponent } from './type-test/type-test.component';

@NgModule({
  declarations: [
    AppComponent,
    TypeTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
