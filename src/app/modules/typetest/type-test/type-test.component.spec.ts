import { TypeTestComponent } from "./type-test.component"
import { TypetestModule } from "../typetest.module"
import { MockBuilder, MockRender } from "ng-mocks"

describe('TypeTestComponent', () => {
  beforeEach(() => MockBuilder(TypeTestComponent, TypetestModule))

  it("should create", () => {
    const {point} = MockRender(TypeTestComponent)
    expect(point.componentInstance).toBeTruthy()
  })
});
