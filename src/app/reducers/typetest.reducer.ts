import {Action, createReducer, on} from '@ngrx/store';

import * as TypeTestActions from '../actions/typetest.actions';

const randomWords = require('random-words');

export interface TypeTestState {
    message: string;
    userMessage: string;
    testStarted: boolean;
    testFinished: boolean;
    startedAt: Date;
    finishedAt: Date;
}

export const initalTypeTestState: TypeTestState = {
    testStarted: false,
    testFinished: false,
    startedAt: undefined,
    finishedAt: undefined,
    message: randomWords({exactly: 100, join: ' '}),
    userMessage: ''
};


const typetestReducer = createReducer(
    initalTypeTestState,
    on(TypeTestActions.userInput, (state, {userMessage}) => {
        return Object.assign({}, state, {userMessage});
    }),
    on(TypeTestActions.startTest, state => {
        return Object.assign({}, state, {startedAt: new Date(), testStarted: true});
    }),
    on(TypeTestActions.finishTest, state => {
        return Object.assign({}, state, {finishedAt: new Date(), testFinished: true});
    })
);

export function reducer(state: TypeTestState | undefined, action: Action) {
    return typetestReducer(state, action);
}
