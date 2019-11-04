import {Injectable} from '@angular/core';
import {TestState} from './store/reducers/typetest.reducer';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';

@Injectable()
export class TypetestService {

  constructor(private db: AngularFirestore) {
  }


  get(id) {
    return this.db.doc<TestState>('results/' + id)
      .valueChanges()
      .pipe(map(res => {
        return res;
      }), first());
  }


  add(typetest: TestState) {
    return this.db.collection<TestState>('results')
      .add(
        {
          userMessage: typetest.userMessage,
          initialMessage: typetest.initialMessage,
          testStarted: typetest.testStarted,
          testFinished: typetest.testFinished,
          startedAt: typetest.startedAt,
          finishedAt: typetest.finishedAt,
          result: {...typetest.result}
        });
  }


}
