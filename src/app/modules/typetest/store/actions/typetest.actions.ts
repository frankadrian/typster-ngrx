import {createAction, props} from '@ngrx/store';

export const userInput = createAction('[Type Test] User Input', props<{userMessage: string}>());
export const startTest = createAction('[Type Test] Start test');
export const stopTest = createAction('[Type Test] Finish test');
export const addTestToFirestore = createAction('[Type Test] Add test to Firestore');
export const addTestToFirestoreSuccess = createAction('[Type Test] Add test to Firestore Success');

