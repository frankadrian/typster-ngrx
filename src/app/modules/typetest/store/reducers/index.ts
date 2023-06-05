import { ActionReducerMap, createFeatureSelector } from "@ngrx/store"

import * as fromTypeTest from "./typetest.reducer"
import { TestState } from "../../../types/TestState"

export interface TypeTestState {
  test: TestState;
}

export const reducers: ActionReducerMap<TypeTestState> = {
  test: fromTypeTest.reducer
};

export const getTypeTestState = createFeatureSelector<TypeTestState>('test');

