import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'timestampToDate',
  standalone: true,
  pure: true
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: number): Date {
    return new Date(value * 1000);
  }

}
