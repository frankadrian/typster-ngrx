import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing"
import { Observable, of } from "rxjs"

import { LeaderboardEffects } from "./leaderboard.effects"
import { LeaderboardService } from "../../leaderboard.service"

describe('LeaderboardEffects', () => {
  let actions$: Observable<unknown>;
  let effects: LeaderboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeaderboardEffects,
        provideMockActions(() => actions$),
        {
          provide: LeaderboardService,
          useValue: {get: of([])}
        }
      ]
    });

    effects = TestBed.inject(LeaderboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
