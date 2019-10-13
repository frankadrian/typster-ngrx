import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromTypeTest from './typetest.reducer';
import {TypeTestState} from './typetest.reducer';

export interface State {
  typetest: TypeTestState;
}

export const reducers: ActionReducerMap<State> = {
   typetest: fromTypeTest.reducer


};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
