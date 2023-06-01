import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'typetest',
    loadChildren: () => import('./modules/typetest/typetest.module').then(m => m.TypetestModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
