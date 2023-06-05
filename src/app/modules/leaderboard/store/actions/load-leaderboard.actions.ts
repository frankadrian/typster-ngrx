import { createActionGroup, emptyProps, props } from "@ngrx/store"

export const LeaderboardActions = createActionGroup({
  source: 'Leaderboard',
  events: {
    'Load Leaderboards': emptyProps(),
    'Load Leaderboards Success': props<{ data: unknown }>(),
    'Load Leaderboards Failure': props<{ error: unknown }>(),
  }
});
