import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing"
import { Observable } from "rxjs"

import { LeaderboardEffects } from "./leaderboard.effects"

describe('LeaderboardEffects', () => {
  let actions$: Observable<unknown>;
  let effects: LeaderboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeaderboardEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LeaderboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
