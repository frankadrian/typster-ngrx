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

export interface Result {
    wpm: number;
    accuracy: number;
}

export interface TypeTestState {
    message: Word[];
    userMessage: string;
    testStarted: boolean;
    testFinished: boolean;
    startedAt: Date;
    finishedAt: Date;
    result: Result;
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
    userMessage: '',
    result: new class implements Result {
        wpm = 0;
        accuracy = 100;
    }
};

function calculateWPM(state, noOfWords) {
    const now = new Date();
    const seconds = (now.getTime() - state.startedAt.getTime()) / 1000;

    if (noOfWords > 0) {
        // calculate wpm
        state.result.wpm = noOfWords / seconds * 60;
    }
    return state;
}

const typetestReducer = createReducer(
    initalTypeTestState,
    on(TypeTestActions.userInput, (state, {userMessage}) => {
        const endsOnSpace = new RegExp(/\s.$/);
        const onNewWorldAlready = endsOnSpace.test(userMessage) ? 1 : 0;
        const noOfWords = userMessage.split(' ').length;
        console.log('noOfWords', noOfWords);

        state.message.map((word, index) => {
                // set all words to inactive
                word.isActive = false;
                word.isPast = index < noOfWords - 1;
            }
        );

        // set only current word to active
        state.message[noOfWords - 1].isActive = true;

        state = calculateWPM(state, noOfWords);

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
