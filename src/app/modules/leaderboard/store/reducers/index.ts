import { isDevMode } from "@angular/core"
import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store"
import { Result } from "../../../typetest/store/reducers/typetest.reducer"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"

export const leaderboardFeatureKey = 'leaderboard';

export interface Leaders {
  name: string
  result: Result
}
export interface LeaderboardState {
  isLoading: boolean
  data: Leaders[]
}

const initalState :LeaderboardState = {
  isLoading: false,
  data: []
}
export const reducers: ActionReducer<LeaderboardState> = createReducer(
  initalState,
  on(LeaderboardActions.loadLeaderboards, (state, action)=>{

    return state;

  })
);


export const metaReducers: MetaReducer<LeaderboardState>[] = isDevMode() ? [] : [];
