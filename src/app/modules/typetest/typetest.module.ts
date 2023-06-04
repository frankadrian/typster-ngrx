import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TypetestRoutingModule} from './typetest-routing.module';
import {TypeTestComponent} from './type-test/type-test.component';
import {TypeTestResultComponent} from './type-test-result/type-test-result.component';
import {TypetestService} from './typetest.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {TypetestEffectsService} from './store/effects/typetest-effects.service';
import {TypetestResultResolverService} from './type-test-result/typetest-result-resolver.service';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';


@NgModule({
  declarations: [TypeTestComponent, TypeTestResultComponent],
  providers: [TypetestService, TypetestResultResolverService],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TypetestRoutingModule,
    StoreModule.forFeature('test', reducers),
    EffectsModule.forFeature([TypetestEffectsService]),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class TypetestModule {
}
