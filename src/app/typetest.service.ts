import {Injectable} from '@angular/core';
import {TypeTestState} from './reducers/typetest.reducer';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypetestService {

  constructor(private db: AngularFirestore) {
  }


  get(id) {
    return this.db.doc<TypeTestState>('results/' + id)
      .valueChanges()
      .pipe(map(res => {
        return res;
      }), first());
  }


  add(typetest: TypeTestState) {
    return this.db.collection<TypeTestState>('results')
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
