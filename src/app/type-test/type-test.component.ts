import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {TypeTestState} from '../reducers/typetest.reducer';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {MatDialog} from '@angular/material';
import {startTest, stopTest, userInput} from '../actions/typetest.actions';

@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss']
})
export class TypeTestComponent implements OnDestroy {

  typetest$: Observable<TypeTestState>;
  typetestVal: TypeTestState;
  subscribeTimer = 60;
  private timeLeft = 59;

  private timer: Subscription;

  constructor(private store: Store<State>, public dialog: MatDialog) {
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
