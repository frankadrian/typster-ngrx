import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromTypeTest from './typetest.reducer';

export interface TypeTestState {
  test: fromTypeTest.TestState;
}

export const reducers: ActionReducerMap<TypeTestState> = {
  test: fromTypeTest.reducer
};


export const getTypeTestState = createFeatureSelector<TypeTestState>('test');

