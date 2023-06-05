import { isDevMode } from "@angular/core"
import { ActionReducer, createFeatureSelector, createReducer, MetaReducer, on } from "@ngrx/store"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"
import { Result } from "../../../types/Result"
import { TestState } from "../../../types/TestState"

export const leaderboardFeatureKey = "leaderboard"

export interface Leaders {
  name: string
  result: Result
}

export interface LeaderboardState {
  isLoading: boolean
  data: TestState[]
}

const initalState: LeaderboardState = {
  isLoading: false,
  data: []
}
export const reducers: ActionReducer<LeaderboardState> = createReducer(
  initalState,
  on(LeaderboardActions.loadLeaderboards, (state, action) => {
    return {...state, isLoading: true}
  }),
  on(LeaderboardActions.loadLeaderboardsSuccess, (state, action) => {
    console.log("tod: action", action)
    return {...state, isLoading: false, data: action.data}
  }),
  on(LeaderboardActions.loadLeaderboardsFailure, (state, action) => {
    return {...state, isLoading: false}
  })
)


export const metaReducers: MetaReducer<LeaderboardState>[] = isDevMode() ? [] : []
export const getLeaderboardState = createFeatureSelector<LeaderboardState>(leaderboardFeatureKey);
