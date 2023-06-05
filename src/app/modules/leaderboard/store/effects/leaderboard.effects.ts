import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { LeaderboardActions } from "../actions/load-leaderboard.actions"
import { LeaderboardService } from "../../leaderboard.service"


@Injectable()
export class LeaderboardEffects {


  fetchLeaderboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaderboardActions.loadLeaderboards),
      switchMap((action) => {
        return this.leaderboardService.get().pipe(map((data) => {
          console.log('data', data)
           return LeaderboardActions.loadLeaderboardsSuccess({data: data})
        }))
      })
    ),
    {dispatch:false}
  )


  constructor(private actions$: Actions, private  leaderboardService: LeaderboardService) {}
}
