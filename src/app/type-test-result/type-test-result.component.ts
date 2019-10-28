import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-type-test-result',
  templateUrl: './type-test-result.component.html',
  styleUrls: ['./type-test-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
