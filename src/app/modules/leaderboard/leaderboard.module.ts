import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LeaderboardRoutingModule } from "./leaderboard-routing.module"
import { StoreModule } from "@ngrx/store"
import * as fromLeaderboard from "./store/reducers"
import { EffectsModule } from "@ngrx/effects"
import { LeaderboardEffects } from "./store/effects/leaderboard.effects"


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    StoreModule.forFeature(fromLeaderboard.leaderboardFeatureKey, fromLeaderboard.reducers, { metaReducers: fromLeaderboard.metaReducers }),
    EffectsModule.forFeature([LeaderboardEffects])
  ]
})
export class LeaderboardModule { }
