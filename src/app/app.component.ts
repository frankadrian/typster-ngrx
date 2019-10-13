import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription, timer} from 'rxjs';
import {TypeTestState} from './reducers/typetest.reducer';
import {State} from './reducers';
import {startTest, userInput, stopTest} from './actions/typetest.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    typetest$: Observable<TypeTestState>;
    typetestVal: TypeTestState;
    subscribeTimer = 60;
    private timeLeft = 59;

    private timer: Subscription;

    constructor(private store: Store<State>) {
        this.typetest$ = this.store.select('typetest');
        this.typetest$.subscribe(val => {
            this.typetestVal = val;
            console.log('val', val);
        });
    }

    userInput($event) {
        const userMessage = $event.target.textContent;
        console.log('userinput');
        if (!this.typetestVal.testStarted) {
            this.startTest();
        }

        if (!this.typetestVal.testFinished) {
            this.store.dispatch(userInput({userMessage}));
        } else {
            console.log('preventing');
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    oberserableTimer() {
        const source = timer(1000, 1000);
        this.timer = source.subscribe(val => {
            console.log(val, '-');
            this.subscribeTimer = this.timeLeft - val;

            if (this.subscribeTimer === 0) {
                this.stopTest();
            }
        });
    }

    stopTest() {
        this.store.dispatch(stopTest());
        this.timer.unsubscribe();
    }

    focus($event) {
        if (!this.typetestVal.testStarted) {
            $event.target.textContent = '';
        }
    }

    startTest() {
        this.oberserableTimer();
        this.store.dispatch(startTest());

    }

    ngOnDestroy(): void {
        this.timer.unsubscribe();
    }
}
