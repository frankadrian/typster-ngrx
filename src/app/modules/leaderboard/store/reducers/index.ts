import { isDevMode } from "@angular/core"
import { ActionReducer, createFeatureSelector, createReducer, MetaReducer, on } from "@ngrx/store"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"
import { Leaders } from "../../Leaders.type"

export const leaderboardFeatureKey = "leaderboard"

export interface LeaderboardState {
  isLoading: boolean
  data: Leaders[]
}

const initalState: LeaderboardState = {
  isLoading: false,
  data: []
}
export const reducers: ActionReducer<LeaderboardState> = createReducer(
  initalState,
  on(LeaderboardActions.loadLeaderboards, (state) => {
    return {...state, isLoading: true}
  }),
  on(LeaderboardActions.loadLeaderboardsSuccess, (state, action) => {
    return {...state, isLoading: false, data: action.data}
  }),
  on(LeaderboardActions.loadLeaderboardsFailure, (state) => {
    return {...state, isLoading: false}
  })
)


export const metaReducers: MetaReducer<LeaderboardState>[] = isDevMode() ? [] : []
export const getLeaderboardState = createFeatureSelector<LeaderboardState>(leaderboardFeatureKey);
