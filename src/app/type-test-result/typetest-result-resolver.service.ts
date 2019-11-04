import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TypeTestState} from '../reducers/typetest.reducer';
import {TypetestService} from '../typetest.service';

@Injectable({
  providedIn: 'root'
})
export class TypetestResultResolverService implements Resolve<TypeTestState> {
  constructor(private dbService: TypetestService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TypeTestState> {
    const id = route.paramMap.get('typetest');
    return this.dbService.get(id);
  }
}
