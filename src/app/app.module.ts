import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {reducers, CustomSerializer} from './store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  getFirestore, provideFirestore } from "@angular/fire/firestore"
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule, FullRouterStateSerializer} from '@ngrx/router-store';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: FullRouterStateSerializer }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule

  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
