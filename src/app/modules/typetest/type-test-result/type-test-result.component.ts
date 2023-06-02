import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { TestState } from "../store/reducers/typetest.reducer"

@Component({
  selector: 'app-type-test-result',
  templateUrl: './type-test-result.component.html',
  styleUrls: ['./type-test-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeTestResultComponent implements OnInit {
  typetestResults: TestState;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { typetest: TestState }) => {
        this.typetestResults = data.typetest;
      });
  }

}
