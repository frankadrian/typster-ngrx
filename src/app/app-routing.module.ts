import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeTestComponent} from './type-test/type-test.component';
import {TypeTestResultComponent} from './type-test-result/type-test-result.component';
import {TypetestResultResolverService} from './type-test-result/typetest-result-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TypeTestComponent
  },
  {
    path: 'result/:typetest',
    component: TypeTestResultComponent,
    resolve: {
      typetest: TypetestResultResolverService
    }
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
