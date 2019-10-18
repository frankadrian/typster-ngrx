import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTestComponent } from './type-test.component';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../reducers';

describe('TypeTestComponent', () => {
  let component: TypeTestComponent;
  let fixture: ComponentFixture<TypeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],

      declarations: [ TypeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have typetest$ Observable`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.typetest$).toBeTruthy();
  });
});
