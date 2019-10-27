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
  isValid: boolean;
  isPast: boolean;
}

export interface Result {
  wpm: number;
  accuracy: number;
}

export interface TypeTestState {
  message: Word[];
  userMessage: string;
  initialMessage: string;
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
    const wordOb: Word = {isActive: false, letters: [], isPast: false, isValid: false};
    word.split('').forEach(letter => {
      const letterOb: Letter = {
        letter,
        isValid: false,
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
  initialMessage: initialRandomWords.join(' '),
  userMessage: '',
  result: new class implements Result {
    wpm = 0;
    accuracy = 1;
  }
};

function calculateWPM(state: TypeTestState, noOfWords) {
  const now = new Date();
  const seconds = (now.getTime() - state.startedAt.getTime()) / 1000;
  // calculate wpm
  state.result.wpm = noOfWords / seconds * 60;

  return state;
}

function calculateAccuracy(state: TypeTestState, noOfWords) {
  const validWords = state.message.filter(word => word.isValid && word.isPast).length;

  state.result.accuracy = (validWords / noOfWords);

  return state;
}

function compareWords(word: Word, userWord) {
  const wordArray = userWord ? userWord.trim().split('') : [];

  wordArray.forEach((userLetter, index) => {
    if (word.letters[index]) {
      word.letters[index].isValid = word.letters[index].letter === userLetter;
    }
  });

  return word.letters.every(letter => letter.isValid);

}

const typetestReducer = createReducer(
  initalTypeTestState,
  on(TypeTestActions.userInput, (state, {userMessage}) => {
    const userMessageArray = userMessage.split(' ');
    const noOfWords = userMessageArray.length;


    state.message.map((word, index) => {
        // set all words to inactive
        word.isActive = false;
        word.isPast = index < noOfWords - 1;
      }
    );


    // set only current word to active
    state.message[noOfWords - 1].isActive = true;

    if (noOfWords > 0) {
      state = calculateWPM(state, noOfWords);
      state = calculateAccuracy(state, noOfWords);

      userMessageArray.map((word, index) => {
        state.message[index].isValid = compareWords(state.message[index], word);
      });
    }
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
