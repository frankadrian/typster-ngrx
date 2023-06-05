import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { Store } from "@ngrx/store"
import { TestState } from "../../typetest/store/reducers/typetest.reducer"
import { Subscription } from "rxjs"
import { LeaderboardActions } from "../store/actions/load-leaderboard.actions"

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent implements OnInit {
  private subscription: Subscription

  constructor(private store: Store<TestState>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.store.dispatch(LeaderboardActions.loadLeaderboards())
    /*
      this.subscription = this.store.select(getTestState)
        .subscribe(leaders => {
          this.typetest = typetest
          if (this.typetest.testFinished) {
            //  this.store.dispatch(resetTest())
          }
          this.cd.markForCheck()
        })*/
  }


}
