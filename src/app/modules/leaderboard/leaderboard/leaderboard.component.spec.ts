import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LeaderboardComponent } from "./leaderboard.component"
import { provideMockStore } from "@ngrx/store/testing"

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeaderboardComponent],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
