import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TypeTestState} from './reducers/typetest.reducer';
import {State} from './reducers';
import {userInput} from './actions/typetest.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    typetest$: Observable<TypeTestState>;

    constructor(private store: Store<State>) {
        this.typetest$ = this.store.select('typetest');
    }

    userInput(userMessage) {
        this.store.dispatch(userInput({userMessage}));
    }
}
