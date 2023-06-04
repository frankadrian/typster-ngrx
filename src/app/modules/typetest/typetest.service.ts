import {Injectable} from '@angular/core';
import {TestState} from './store/reducers/typetest.reducer';
import { addDoc, collection, doc, docData, Firestore } from "@angular/fire/firestore"
import {first, map} from 'rxjs/operators';
import { Observable } from "rxjs"

@Injectable()
export class TypetestService {

  constructor(private firestore: Firestore) {
  }


  get(id):Observable<TestState> {
    const collectionRef =  collection(this.firestore, "results")
    const docRef = doc(collectionRef, id)
    return docData(docRef).pipe(map(res => {
      return <TestState>res;
    }), first())
  }


  add(typetest: TestState) {
    return addDoc(collection(this.firestore,'results'), {
      userMessage: typetest.userMessage,
        initialMessage: typetest.initialMessage,
        testStarted: typetest.testStarted,
        testFinished: typetest.testFinished,
        startedAt: typetest.startedAt,
        finishedAt: typetest.finishedAt,
        result: {...typetest.result}
    })
  }


}
