import { createAction, props } from "@ngrx/store"

export const userInput = createAction('[Type Test] User Input', props<{ userMessage: string }>());
export const startTest = createAction('[Type Test] Start test');
export const stopTest = createAction('[Type Test] Finish test');
export const resetTest = createAction('[Type Test] Reset test');
export const saveUsername = createAction('[Type Test] Save Username', props<{ name: string }>());
export const saveTestId = createAction('[Type Test] Save Test ID', props<{ id: string }>());
export const addTestToFirestore = createAction('[Type Test] Add test to Firestore');
export const addTestToFirestoreSuccess = createAction('[Type Test] Add test to Firestore Success');

