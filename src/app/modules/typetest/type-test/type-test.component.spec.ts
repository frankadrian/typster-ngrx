import { TypeTestComponent } from "./type-test.component"
import { provideMockStore } from "@ngrx/store/testing"
import { initalTypeTestState } from "../store/reducers/typetest.reducer"
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { environment } from "../../../../environments/environment"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { TypetestModule } from "../typetest.module"
import { getTestState } from "../store"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"

describe("TypeTestComponent", () => {
  let component: TypeTestComponent
  let fixture: ComponentFixture<TypeTestComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TypetestModule,
        StoreModule.forRoot(),
        EffectsModule.forRoot([]),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        provideMockStore({initialState: {test: {initalTypeTestState}}, selectors: [{selector: getTestState, value: initalTypeTestState}]}),
      ],
      declarations: [TypeTestComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
