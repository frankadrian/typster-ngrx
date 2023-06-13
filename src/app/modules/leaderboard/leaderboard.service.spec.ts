import { TestBed } from "@angular/core/testing"

import { LeaderboardService } from "./leaderboard.service"
import { Firestore } from "@angular/fire/firestore"

describe("LeaderboardService", () => {
  let service: LeaderboardService

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: Firestore, useValue: {}}]})
    service = TestBed.inject(LeaderboardService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
