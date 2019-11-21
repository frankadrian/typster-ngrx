import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {reducers, CustomSerializer} from './store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatIconModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';

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
    StoreRouterConnectingModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
