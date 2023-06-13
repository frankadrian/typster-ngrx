import { Action, createReducer, on } from "@ngrx/store"
import * as TypeTestActions from "../actions/typetest.actions"
import { timer } from "rxjs"
import randomWords from "random-words"
import { TestState } from "../../../types/TestState"
import { Letter } from "../../../types/Letter"
import { Result } from "../../../types/Result"

const LETTERS_PER_WORD = 5
const numberOfWords = 100
const initialRandomWordsString = randomWords({exactly: numberOfWords}).join(String.fromCharCode(32))

function generateMessage(wordsString: string): Letter[] {
  const lettersOb = []
  wordsString.split("").forEach((letter, key) => {
    const letterOb: Letter = {
      letter,
      isValid: false,
      userLetter: "",
      isActive: key === 0
    }
    lettersOb.push(letterOb)
  })
  return lettersOb
}

export const initalTypeTestState: TestState = {
  timer: null,
  testStarted: false,
  testFinished: false,
  startedAt: undefined,
  finishedAt: undefined,
  message: generateMessage(initialRandomWordsString),
  initialMessage: initialRandomWordsString,
  userMessage: "",
  result: new class implements Result {
    wpm = 0
    accuracy = 1
  }()
}

function getInitialState(testString): TestState {
  return Object.assign({}, initalTypeTestState, {
    message: generateMessage(testString),
    initialMessage: testString,
    result: new class implements Result {
      wpm = 0
      accuracy = 1
    }()
  })
}

function calculateWPM(state: TestState, noOfWords) {
  const now = new Date()
  const seconds = (now.getTime() - state.startedAt.getTime()) / 1000
  // calculate wpm
  return noOfWords / seconds * 60
}

function calculateAccuracy(state: TestState, noOfLetters) {
  const validLetters = state.message.filter(letter => letter.isValid).length
  return (validLetters / noOfLetters)
}

const typetestReducer = createReducer(
  getInitialState(initialRandomWordsString),
  on(TypeTestActions.userInput, (state, {userMessage}) => {
    // fix so spaces compare correctly 🤪
    userMessage = userMessage.replace(String.fromCharCode(160), ' ');
    const userMessageArray = userMessage.split('');
    const noOfWords = userMessageArray.length / LETTERS_PER_WORD;

    userMessageArray.forEach((letter, index) => {
      state.message[index].isValid = letter === state.message[index].letter;
      state.message[index].isActive = false;
    });

    // set next word active
    state.message[userMessageArray.length].isActive = true;

    state.result.wpm = calculateWPM(state, noOfWords);
    state.result.accuracy = calculateAccuracy(state, userMessage.length);

    return Object.assign({}, state, {userMessage});
  }),
  on(TypeTestActions.startTest, state => {
    return Object.assign({}, state, {startedAt: new Date(), testStarted: true, timer: timer(0, 1000)})
  }),
  on(TypeTestActions.stopTest, state => {
    return Object.assign({}, state, {finishedAt: new Date(), testFinished: true})
  }),
  on(TypeTestActions.saveUsername, (state, {name}) => {
    return Object.assign({}, state, {result: {...state.result, name}})
  }),
  on(TypeTestActions.saveTestId, (state, {id}) => {
    return Object.assign({}, state, {id: id})
  }),
  on(TypeTestActions.resetTest, () => {
    const newTestString = randomWords({exactly: numberOfWords}).join(String.fromCharCode(32))
    return Object.assign({}, getInitialState(newTestString))
  })
)

export function reducer(state: TestState | undefined, action: Action) {
  return typetestReducer(state, action)
}
