import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription, timer} from 'rxjs';
import {TypeTestState} from './reducers/typetest.reducer';
import {State} from './reducers';
import {startTest, userInput, stopTest} from './actions/typetest.actions';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
