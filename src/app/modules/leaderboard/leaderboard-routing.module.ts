import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { CommonModule } from "@angular/common"
import { LeaderboardComponent } from "./leaderboard/leaderboard.component"

const routes: Routes = [
  {
    path: "", component: LeaderboardComponent,
    resolve: {
    //leaders: TypetestResultResolverService
    }
  },

]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {
}
