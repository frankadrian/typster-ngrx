import { createActionGroup, emptyProps, props } from "@ngrx/store"
import { Leaders } from "../../Leaders.type"

export const LeaderboardActions = createActionGroup({
  source: 'Leaderboard',
  events: {
    'Load Leaderboards': emptyProps(),
    'Load Leaderboards Success': props<{ data: Leaders[] }>(),
    'Load Leaderboards Failure': props<{ error: unknown }>(),
  }
});
