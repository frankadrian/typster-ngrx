import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Result} from '../reducers/typetest.reducer';

@Injectable({
  providedIn: 'root'
})
export class TypetestResultResolverService implements Resolve<Result> {
  constructor(private db: AngularFirestore) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    const id = route.paramMap.get('typetest');
    return this.db.doc<Result>('results/' + id)
      .valueChanges()
      .pipe(map(res => {
        return res;
      }), first());
  }
}
