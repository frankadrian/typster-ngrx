import { TypeTestResultComponent } from "./type-test-result.component"
import { MockBuilder, MockInstance, MockRender } from "ng-mocks"
import { TypetestModule } from "../typetest.module"
import { RouterTestingModule } from "@angular/router/testing"
import { of } from "rxjs"
import { ActivatedRoute } from "@angular/router"
import { initalTypeTestState } from "../store/reducers/typetest.reducer"

describe("TypeTestResultComponent", () => {
 MockInstance.scope()
  beforeEach(() => {
    MockInstance(ActivatedRoute, "data", of({typetest: initalTypeTestState}))
    return MockBuilder(TypeTestResultComponent, [TypetestModule, RouterTestingModule])
  })

  it("should create", () => {
    const {point} = MockRender(TypeTestResultComponent)
    expect(point.componentInstance).toBeTruthy()
  })
})
