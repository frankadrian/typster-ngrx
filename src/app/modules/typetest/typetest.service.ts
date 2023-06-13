import { Injectable } from "@angular/core"
import { addDoc, collection, doc, docData, Firestore, updateDoc } from "@angular/fire/firestore"
import { first, map } from "rxjs/operators"
import { Observable } from "rxjs"
import { TestState } from "../types/TestState"

@Injectable()
export class TypetestService {

  constructor(private firestore: Firestore) {
  }


  get(id): Observable<TestState> {
    const collectionRef = collection(this.firestore, "results")
    const docRef = doc(collectionRef, id)
    return docData(docRef).pipe(map(res => {
      return <TestState>res
    }), first())
  }


  add(typetest: TestState) {
    return addDoc(collection(this.firestore, "results"), {
      userMessage: typetest.userMessage,
      initialMessage: typetest.initialMessage,
      testStarted: typetest.testStarted,
      testFinished: typetest.testFinished,
      startedAt: typetest.startedAt,
      finishedAt: typetest.finishedAt,
      result: {...typetest.result}
    })
  }

  savePublicResult(typetest: TestState) {
    return addDoc(collection(this.firestore, "public-results"), {...typetest.result, finishedAt: typetest.finishedAt})
  }

  setName(typetest: TestState, name: string) {
    return updateDoc(doc(this.firestore, "results", typetest.id), {
      result: {
        ...typetest.result,
        name
      }
    })
  }
}
