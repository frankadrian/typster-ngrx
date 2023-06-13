import { createSelector } from "@ngrx/store"
import * as fromFeature from "../../../leaderboard/store/reducers"

export const getLeaderboardState = createSelector(fromFeature.getLeaderboardState, (state: fromFeature.LeaderboardState) => state)
export const getLoading = createSelector(fromFeature.getLeaderboardState, (state: fromFeature.LeaderboardState) => state.isLoading)
