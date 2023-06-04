import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core"
import { mergeMap, Subscription } from "rxjs"
import { Store } from "@ngrx/store"
import { getTestState, getTimerObservable } from "../store"
import { resetTest, startTest, stopTest, userInput } from "../store/actions/typetest.actions"
import { TestState } from "../store/reducers/typetest.reducer"
import { animate, style, transition, trigger } from "@angular/animations"

@Component({
  selector: "app-type-test",
  templateUrl: "./type-test.component.html",
  styleUrls: ["./type-test.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({transform: "translateY(100%)"}),
        animate("200ms ease-in", style({transform: "translateY(0%)"}))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({transform: "translateY(-100%)"}))
      ])
    ])
  ]
})
export class TypeTestComponent implements OnDestroy, OnInit, AfterViewInit {
  typetest: TestState
  subscribeTimer = 0
  // how long the typetest should be in seconds
  maxTime = 60
  private typetestSubscription: Subscription
  @ViewChild("userInput") userInput: ElementRef<HTMLInputElement>

  constructor(private store: Store<TestState>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.typetestSubscription = this.store.select(getTestState)
      .subscribe(typetest => {
        this.typetest = typetest
        if (this.typetest.testFinished) {
          this.store.dispatch(resetTest())
        }
        this.cd.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this.typetestSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.userInput.nativeElement.focus()
  }

  private stopTest() {
    this.store.dispatch(stopTest())
  }

  onUserInput($event) {
    const userMessage = $event.target.textContent
    if (!this.typetest.testStarted) {
      this.startTest()
    }

    if (!this.typetest.testFinished) {
      this.store.dispatch(userInput({userMessage}))
    } else {
      console.log("preventing")
      $event.preventDefault()
      $event.stopPropagation()
    }
  }

  startTest() {
    this.store.dispatch(startTest())

    const timerStoreSub = this.store.select(getTimerObservable)
      .pipe(mergeMap(timer$ => timer$))
      .subscribe(time => {
        this.subscribeTimer = time
        this.cd.markForCheck()
        if (this.subscribeTimer === this.maxTime) {
          this.stopTest()
          timerStoreSub.unsubscribe()
        }
      })
  }
}
