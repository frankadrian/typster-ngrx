import { Observable } from "rxjs"
import { Result } from "./Result"
import { Letter } from "./Letter"

export interface TestState {
  timer?: Observable<number> | null;
  message?: Letter[];
  userMessage: string;
  initialMessage: string;
  testStarted: boolean;
  testFinished: boolean;
  startedAt: Date;
  finishedAt: Date;
  result: Result;
  id?: string
}
