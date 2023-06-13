import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"
import { LeaderboardService } from "../../leaderboard.service"
import { Leaders } from "../../Leaders.type"


@Injectable()
export class LeaderboardEffects {

  fetchLeaderboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaderboardActions.loadLeaderboards),
      switchMap(() => {
        return this.leaderboardService.get().pipe(map((data) => {
           return LeaderboardActions.loadLeaderboardsSuccess({data: data as Leaders[]})
        }))
      })
    ),
  )


  constructor(private actions$: Actions, private  leaderboardService: LeaderboardService) {}
}
