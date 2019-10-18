import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeTestComponent} from './type-test/type-test.component';

const routes: Routes = [
  {
    path: '',
    component: TypeTestComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
