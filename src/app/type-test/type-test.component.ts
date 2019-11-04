import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {TypeTestState} from '../reducers/typetest.reducer';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {startTest, stopTest, userInput} from '../actions/typetest.actions';

@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestComponent implements OnDestroy {

  typetest: TypeTestState;
  subscribeTimer = 10;
  private typetestSubscription: Subscription;
  private timeLeft = this.subscribeTimer - 1;

  private timer: Subscription;

  constructor(private store: Store<State>) {
      this.typetestSubscription = this.store.select('typetest')
      .subscribe(typetest => this.typetest = typetest);
  }

  userInput($event) {
    const userMessage = $event.target.textContent;
    if (!this.typetest.testStarted) {
      this.startTest();
    }

    if (!this.typetest.testFinished) {
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
    if (!this.typetest.testStarted) {
      $event.target.textContent = '';
    }
  }

  startTest() {
    this.oberserableTimer();
    this.store.dispatch(startTest());
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
    this.typetestSubscription.unsubscribe();
  }

}
