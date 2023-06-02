import { WelcomeComponent } from "./welcome.component"
import { MockBuilder, MockRender } from "ng-mocks"
import { AppModule } from "../../app.module"

describe("WelcomeComponent", () => {

  beforeEach(() => MockBuilder(WelcomeComponent, AppModule))

  it("should create", () => {
    const {point} = MockRender(WelcomeComponent)
    expect(point.componentInstance).toBeTruthy()
  })
})
