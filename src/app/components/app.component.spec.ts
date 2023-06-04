import { AppComponent } from "./app.component"
import { MockBuilder, MockRender } from "ng-mocks"
import { AppModule } from "../app.module"

describe('AppComponent', () => {

  beforeEach(() => MockBuilder(AppComponent, AppModule))

  it("should create", () => {
    const {point} = MockRender(AppComponent)
    expect(point.componentInstance).toBeTruthy()
  })
});
