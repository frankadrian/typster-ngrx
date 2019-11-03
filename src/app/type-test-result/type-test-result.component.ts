import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Result, TypeTestState} from '../reducers/typetest.reducer';

@Component({
  selector: 'app-type-test-result',
  templateUrl: './type-test-result.component.html',
  styleUrls: ['./type-test-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestResultComponent implements OnInit {

  typetestResults: TypeTestState;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { typetest: TypeTestState }) => {
        this.typetestResults = data.typetest;
      });
  }

}
