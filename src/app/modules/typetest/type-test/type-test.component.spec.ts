import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTestComponent } from './type-test.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TypetestModule} from '../typetest.module';

describe('TypeTestComponent', () => {
  let component: TypeTestComponent;
  let fixture: ComponentFixture<TypeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TypetestModule,
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
