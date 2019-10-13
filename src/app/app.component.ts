import {Component} from '@angular/core';
import {State, TypeTest} from './reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'typster-ngrx';
    typetest$: Observable<TypeTest>;

    constructor(private store: Store<State>) {
        this.typetest$ = this.store.select('typetest');
    }

    keypress($event) {

        // this.store.dispatch()

    }
}
