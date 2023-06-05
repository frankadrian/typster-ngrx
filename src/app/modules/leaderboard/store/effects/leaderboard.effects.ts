import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"
import { LeaderboardService } from "../../leaderboard.service"
import { TestState } from "../../../types/TestState"


@Injectable()
export class LeaderboardEffects {

  fetchLeaderboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaderboardActions.loadLeaderboards),
      switchMap(() => {
        return this.leaderboardService.get().pipe(map((data) => {
           return LeaderboardActions.loadLeaderboardsSuccess({data: data as TestState[]})
        }))
      })
    ),
  )


  constructor(private actions$: Actions, private  leaderboardService: LeaderboardService) {}
}
