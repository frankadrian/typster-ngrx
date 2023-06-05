import { createActionGroup, emptyProps, props } from "@ngrx/store"
import { TestState } from "../../../types/TestState"

export const LeaderboardActions = createActionGroup({
  source: 'Leaderboard',
  events: {
    'Load Leaderboards': emptyProps(),
    'Load Leaderboards Success': props<{ data: TestState[] }>(),
    'Load Leaderboards Failure': props<{ error: unknown }>(),
  }
});
