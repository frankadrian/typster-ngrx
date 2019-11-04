import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {Store} from '@ngrx/store';
import {getTestState} from '../store/reducers';
import {startTest, stopTest, userInput} from '../store/actions/typetest.actions';
import {TestState} from '../store/reducers/typetest.reducer';

@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestComponent implements OnDestroy {

  typetest: TestState;
  subscribeTimer = 10;
  private typetestSubscription: Subscription;
  private timeLeft = this.subscribeTimer - 1;

  private timer: Subscription;

  constructor(private store: Store<TestState>) {
    this.typetestSubscription = this.store.select(getTestState)
      .subscribe(typetest => {
        console.log('type', typetest);
        this.typetest = typetest;
      });
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
    this.typetestSubscription.unsubscribe();
  }

}
