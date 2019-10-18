import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeTestComponent} from './type-test/type-test.component';
import {TypeTestResultComponent} from './type-test-result/type-test-result.component';

const routes: Routes = [
  {
    path: '',
    component: TypeTestComponent
  },
  {
    path: 'result/:typetest',
    component: TypeTestResultComponent
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
