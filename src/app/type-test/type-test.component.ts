import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {Result, TypeTestState} from '../reducers/typetest.reducer';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {startTest, stopTest, userInput} from '../actions/typetest.actions';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestComponent implements OnDestroy {

  private typetestSubscription: Subscription;
  typetest: TypeTestState;
  subscribeTimer = 10;
  private timeLeft = this.subscribeTimer - 1;

  private timer: Subscription;

  constructor(private store: Store<State>,
              private db: AngularFirestore,
              private router: Router) {
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
        // write test results to firebase
        console.log('this.typetest.result', this.typetest.result);
        this.saveTypetest();
      }
    });
  }

  private saveTypetest() {
    this.db.collection<TypeTestState>('results')
      .add(
        {
          userMessage: this.typetest.userMessage,
          initialMessage: this.typetest.initialMessage,
          testStarted: this.typetest.testStarted,
          testFinished: this.typetest.testFinished,
          startedAt: this.typetest.startedAt,
          finishedAt: this.typetest.finishedAt,
          result: {...this.typetest.result}
        })
      .then(res => {
        console.log('res', res);
        this.router.navigate(['result', res.id]);
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
