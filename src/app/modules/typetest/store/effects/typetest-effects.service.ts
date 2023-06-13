import { Injectable } from "@angular/core"
import { TypetestService } from "../../typetest.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { concatMap, switchMap, withLatestFrom } from "rxjs/operators"
import { of } from "rxjs"
import { resetTest, saveTestId, saveUsername, stopTest } from "../actions/typetest.actions"
import { select, Store } from "@ngrx/store"
import { TypeTestState } from "../reducers"
import { Router } from "@angular/router"
import { getTestState } from "../selectors"

@Injectable()
export class TypetestEffectsService {

  saveTypetest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stopTest),


      concatMap(action => of(action).pipe(
        withLatestFrom(this.store$.pipe(select(getTestState))),
      )),

      switchMap(([action, typetest]) => {

        console.log("action", action)
        return this.typetestService.add(typetest).then(({id}) => {
          //console.log('res', res)
          //this.router.navigate(['typetest/result', res.id]);
          return saveTestId({id})
        })
      })
    ),
  )


  setTypetest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveUsername),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store$.pipe(select(getTestState)))
      )),
      switchMap(([action, typetest]) => {
        if (action.name) {
          return Promise.all([this.typetestService.setName(typetest, action.name), this.typetestService.savePublicResult(typetest)]).then(() => this.router.navigate(["leader-board"])).then(() => resetTest())
        }
      })
    )
  )

  constructor(
    private router: Router,
    private actions$: Actions,
    private typetestService: TypetestService,
    private store$: Store<TypeTestState>
  ) {
  }
}
