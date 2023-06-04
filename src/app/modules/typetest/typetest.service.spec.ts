import { TestBed } from "@angular/core/testing"
import { TypetestService } from "./typetest.service"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { environment } from "../../../environments/environment"

describe('TypetestService', () => {
    beforeEach(() => TestBed.configureTestingModule({providers: [TypetestService], imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),]}));

  it('should be created', () => {
    const service: TypetestService = TestBed.inject(TypetestService);
    expect(service).toBeTruthy();
  });
});
