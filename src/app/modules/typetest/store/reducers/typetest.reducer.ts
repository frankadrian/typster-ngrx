import {Action, createReducer, on} from '@ngrx/store';

import * as TypeTestActions from '../actions/typetest.actions';
import {Observable, timer} from 'rxjs';

const randomWords = require('random-words');

const LETTERS_PER_WORD = 5;

export interface Letter {
  letter: string;
  isActive: boolean;
  isValid: boolean;
  userLetter: string;
}

export interface Result {
  wpm: number;
  accuracy: number;
}

export interface TestState {
  timer?: Observable<number> | null;
  message?: Letter[];
  userMessage: string;
  initialMessage: string;
  testStarted: boolean;
  testFinished: boolean;
  startedAt: Date;
  finishedAt: Date;
  result: Result;
}

const numberOfWords = 100;

const initialRandomWordsString = randomWords({exactly: numberOfWords}).join(' ');

function generateMessage(wordsString: string): Letter[] {
  const lettersOb = [];
  wordsString.split('').forEach((letter, key) => {
    const letterOb: Letter = {
      letter,
      isValid: false,
      userLetter: '',
      isActive: key === 0 ? true : false
    };
    lettersOb.push(letterOb);
  });
  return lettersOb;
}

export const initalTypeTestState: TestState = {
  timer: null,
  testStarted: false,
  testFinished: false,
  startedAt: undefined,
  finishedAt: undefined,
  message: generateMessage(initialRandomWordsString),
  initialMessage: initialRandomWordsString,
  userMessage: '',
  result: new class implements Result {
    wpm = 0;
    accuracy = 1;
  }()
};

function getInitialState(testString): TestState {
  return Object.assign({}, initalTypeTestState, {
    message: generateMessage(testString),
    initialMessage: testString,
    result: new class implements Result {
      wpm = 0;
      accuracy = 1;
    }()
  });
}

function calculateWPM(state: TestState, noOfWords) {
  const now = new Date();
  const seconds = (now.getTime() - state.startedAt.getTime()) / 1000;
  // calculate wpm
  state.result.wpm = noOfWords / seconds * 60;

  return state;
}

function calculateAccuracy(state: TestState, noOfWords) {
  const validLetters = state.message.filter(letter => letter.isValid).length;

  // 5 letters are one word
  const validWords = validLetters / LETTERS_PER_WORD;
  state.result.accuracy = (validWords / noOfWords);
  return state;
}

const typetestReducer = createReducer(
  getInitialState(initialRandomWordsString),
  on(TypeTestActions.userInput, (state, {userMessage}) => {
    const userMessageArray = userMessage.split('');
    const noOfWords = userMessageArray.length / LETTERS_PER_WORD;

    userMessageArray.forEach((letter, index) => {
      if (letter === state.message[index].letter) {
        state.message[index].isValid = true;
      } else {
        state.message[index].isValid = false;
      }
      state.message[index].isActive = false;
    });

    // set next word active
    state.message[userMessageArray.length].isActive = true;

    state = calculateWPM(state, noOfWords);
    state = calculateAccuracy(state, noOfWords);

    return Object.assign({}, state, {userMessage});
  }),
  on(TypeTestActions.startTest, state => {
    return Object.assign({}, state, {startedAt: new Date(), testStarted: true, timer: timer(0, 1000)});
  }),
  on(TypeTestActions.stopTest, state => {
    return Object.assign({}, state, {finishedAt: new Date(), testFinished: true});
  }),
  on(TypeTestActions.resetTest, state => {
    const newTestString = randomWords({exactly: numberOfWords}).join(' ');
    return Object.assign({}, getInitialState(newTestString));
  })
);

export function reducer(state: TestState | undefined, action: Action) {
  return typetestReducer(state, action);
}
