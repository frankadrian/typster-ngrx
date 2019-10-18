import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTestComponent } from './type-test.component';
import {AppComponent} from '../app.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TypeTestComponent', () => {
  let component: TypeTestComponent;
  let fixture: ComponentFixture<TypeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.typetest$).toBeTruthy();
  });
});
