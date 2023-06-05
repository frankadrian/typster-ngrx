import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { WelcomeComponent } from "./components/welcome/welcome.component"
import { CommonModule } from "@angular/common"

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'typetest',
    loadChildren: () => import('./modules/typetest/typetest.module').then(m => m.TypetestModule)
  },
  {
    path: 'leader-board',
    loadChildren: () => import('./modules/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
