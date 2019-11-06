import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {getTestState, getTimerObservable} from '../store';
import {resetTest, startTest, stopTest, userInput} from '../store/actions/typetest.actions';
import {TestState} from '../store/reducers/typetest.reducer';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestComponent implements OnDestroy, OnInit {
  typetest: TestState;
  subscribeTimer = 0;
  // how long the typetest should be in seconds
  private maxTime = 10;
  private typetestSubscription: Subscription;


  constructor(private store: Store<TestState>, private cd: ChangeDetectorRef) {
    this.typetestSubscription = this.store.select(getTestState)
      .subscribe(typetest => {
        console.log('type', typetest);
        this.typetest = typetest;
        this.cd.markForCheck();
      });
  }

  ngOnInit() {
    if (this.typetest.testFinished) {
      this.store.dispatch(resetTest());
    }
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

  stopTest() {
    this.store.dispatch(stopTest());
  }

  focus($event) {
    if (!this.typetest.testStarted) {
      $event.target.textContent = '';
    }
  }

  startTest() {
    this.store.dispatch(startTest());

    const timerStoreSub = this.store.select(getTimerObservable)
      .pipe(flatMap(timer$ => timer$))
      .subscribe(time => {
        this.subscribeTimer = time;
        this.cd.markForCheck();
        if (this.subscribeTimer === this.maxTime) {
          this.stopTest();
          timerStoreSub.unsubscribe();
        }
      });
  }

  ngOnDestroy(): void {
    this.typetestSubscription.unsubscribe();
  }

}
