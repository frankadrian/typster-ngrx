import { TypeTestResultComponent } from "./type-test-result.component"
import { MockBuilder, MockRender } from "ng-mocks"
import { TypetestModule } from "../typetest.module"

describe('TypeTestResultComponent', () => {

  beforeEach(() => MockBuilder(TypeTestResultComponent, TypetestModule))

  it("should create", () => {
    const {point} = MockRender(TypeTestResultComponent)
    expect(point.componentInstance).toBeTruthy()
  })
});
