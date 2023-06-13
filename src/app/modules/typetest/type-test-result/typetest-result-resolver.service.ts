import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { TypetestService } from "../typetest.service"
import { TestState } from "../../types/TestState"

@Injectable()
export class TypetestResultResolverService  {
  constructor(private dbService: TypetestService) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestState> {
    const id = route.paramMap.get('typetest');
    return this.dbService.get(id);
  }
}
