import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TestState} from '../store/reducers/typetest.reducer';
import {TypetestService} from '../typetest.service';

@Injectable()
export class TypetestResultResolverService implements Resolve<TestState> {
  constructor(private dbService: TypetestService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestState> {
    const id = route.paramMap.get('typetest');
    return this.dbService.get(id);
  }
}
