import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "absolute" })
export class AbsolutePipe implements PipeTransform {
  transform(num: number): number {
    return Math.abs(num);
  }
}
