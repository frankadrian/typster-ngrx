import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TypeTestResultComponent} from './type-test-result/type-test-result.component';
import {TypetestResultResolverService} from './type-test-result/typetest-result-resolver.service';
import {TypeTestComponent} from './type-test/type-test.component';

const routes: Routes = [
  {path: '', component: TypeTestComponent},
  {
    path: 'result/:typetest',
    component: TypeTestResultComponent,
    resolve: {
      typetest: TypetestResultResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypetestRoutingModule {
}
