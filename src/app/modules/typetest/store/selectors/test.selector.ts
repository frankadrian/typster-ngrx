import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getTestState = createSelector(fromFeature.getTypeTestState, (state: fromFeature.TypeTestState) => state.test);

export const getTimerObservable = createSelector(fromFeature.getTypeTestState, (state: fromFeature.TypeTestState) => state.test.timer);
