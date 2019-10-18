import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTestResultComponent } from './type-test-result.component';

describe('TypeTestResultComponent', () => {
  let component: TypeTestResultComponent;
  let fixture: ComponentFixture<TypeTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
