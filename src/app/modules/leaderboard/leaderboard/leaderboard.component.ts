import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { Store } from "@ngrx/store"
import { Subscription } from "rxjs"
import { LeaderboardActions } from "../store/actions/load-leaderboard.actions"
import { getLeaderboardState } from "../store/selectors/leaderboard.selectors"
import { MatTableModule } from "@angular/material/table"
import { TestState } from "../../types/TestState"

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.sass"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
  ]
})
export class LeaderboardComponent implements OnInit {
  private subscription: Subscription
  displayedColumns: string[] = ['position', 'name', 'accuracy', 'wpm'];

  loading = false;
  leaders = []

  constructor(private store: Store<TestState>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(LeaderboardActions.loadLeaderboards())
    this.subscription = this.store.select(getLeaderboardState)
      .subscribe(({data, isLoading}) => {
        this.loading = isLoading
        this.leaders = data
        console.log("data2", data)
        this.cd.markForCheck()
      })
  }

}
