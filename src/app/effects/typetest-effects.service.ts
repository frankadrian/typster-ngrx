import {Injectable} from '@angular/core';
import {TypetestService} from '../typetest.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {stopTest} from '../actions/typetest.actions';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers';
import {Router} from '@angular/router';

@Injectable()
export class TypetestEffectsService {

  saveTypetest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stopTest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store$.pipe(select('typetest')))
      )),
      tap(([action, typetest]) => {

        console.log('action', action);
        console.log('typetest', typetest);

        this.typetestService.add(typetest).then(res => {
          this.router.navigate(['result', res.id]);
        });

      })
    ),
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private typetestService: TypetestService,
    private store$: Store<State>
  ) {
  }
}
