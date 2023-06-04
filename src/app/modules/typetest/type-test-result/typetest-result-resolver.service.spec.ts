import { TestBed } from "@angular/core/testing"

import { TypetestResultResolverService } from "./typetest-result-resolver.service"
import { TypetestService } from "../typetest.service"
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { environment } from "../../../../environments/environment"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"

describe("TypetestResultResolverService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TypetestResultResolverService, TypetestService],
    imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),]
  }))

  it("should be created", () => {
    const service: TypetestResultResolverService = TestBed.inject(TypetestResultResolverService)
    expect(service).toBeTruthy()
  })
})
