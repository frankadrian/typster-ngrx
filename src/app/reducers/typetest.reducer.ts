import {Action, createReducer, on} from '@ngrx/store';

import * as TypeTestActions from '../actions/typetest.actions';

const randomWords = require('random-words');

export interface Letter {
    letter: string;
    isValid: boolean;
}

export interface Word {
    letters: Letter[];
    isActive: boolean;
    isPast: boolean;
}

export interface TypeTestState {
    message: Word[];
    userMessage: string;
    testStarted: boolean;
    testFinished: boolean;
    startedAt: Date;
    finishedAt: Date;
}

const initialRandomWords = randomWords({exactly: 100});

function generateMessage(words): Word[] {
    const wordsOb = [];
    words.forEach(word => {
        const wordOb: Word = {isActive: false, letters: [], isPast: false};
        word.split('').forEach(letter => {
            const letterOb: Letter = {
                letter,
                isValid: false
            };
            wordOb.letters.push(letterOb);
        });
        wordsOb.push(wordOb);
    });

    return wordsOb;

}

export const initalTypeTestState: TypeTestState = {
    testStarted: false,
    testFinished: false,
    startedAt: undefined,
    finishedAt: undefined,
    message: generateMessage(initialRandomWords),
    userMessage: ''
};

const typetestReducer = createReducer(
    initalTypeTestState,
    on(TypeTestActions.userInput, (state, {userMessage}) => {
        const endsOnSpace = new RegExp(/\s.$/);
        const onNewWorldAlready = endsOnSpace.test(userMessage) ? 1 : 0;
        const noOfWords = userMessage.split(' ').length;
        console.log('endsOnSpace', endsOnSpace)
        console.log('userMessage', userMessage)

        state.message.map((word, index) => {
                // set all words to inactive
                word.isActive = false;
                word.isPast = index < noOfWords - 1;
            }
        );

        // set only current word to active
        state.message[noOfWords - 1].isActive = true;

        return Object.assign({}, state, {userMessage});
    }),
    on(TypeTestActions.startTest, state => {
        return Object.assign({}, state, {startedAt: new Date(), testStarted: true});
    }),
    on(TypeTestActions.stopTest, state => {
        return Object.assign({}, state, {finishedAt: new Date(), testFinished: true});
    })
);

export function reducer(state: TypeTestState | undefined, action: Action) {
    return typetestReducer(state, action);
}
