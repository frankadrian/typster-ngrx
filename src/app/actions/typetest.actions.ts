import {createAction, props} from '@ngrx/store';

export const userInput = createAction('[Type Test] User Input', props<{userMessage: string}>());
export const startTest = createAction('[Type Test] Start test');
export const finishTest = createAction('[Type Test] Finish test');

