import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "absolute",
    standalone: true
})
export class AbsolutePipe implements PipeTransform {
  transform(num: number): number {
    return Math.abs(num);
  }
}
