import { isDevMode } from "@angular/core"
import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store"
import { Result } from "../../../typetest/store/reducers/typetest.reducer"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"

export const leaderboardFeatureKey = "leaderboard"

export interface Leaders {
  name: string
  result: Result
}

export interface LeaderboardState {
  isLoading: boolean
  data: unknown[]
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
    return {...state, isLoading: false}
  }),
  on(LeaderboardActions.loadLeaderboardsFailure, (state, action) => {
    return {...state, isLoading: false}
  })
)


export const metaReducers: MetaReducer<LeaderboardState>[] = isDevMode() ? [] : []
