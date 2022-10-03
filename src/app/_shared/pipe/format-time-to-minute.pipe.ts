import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimeToMinute'
})
export class FormatTimeToMinutePipe implements PipeTransform {
  transform(value: number, type = null): string {
    if (type == null) {
      const hours: number = Math.floor(value / 3600);
      let minutes: number;
      if (value - (hours * 3600) > 0) {
        let subValue1 = value - (hours * 3600);
        minutes = Math.floor(subValue1 / 60);
      } else {
        minutes = 0;
      }
      return (
        // ("00" + hours).slice(-2) +
        // ":" +
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    } else {
      const hours: number = Math.floor(value / 3600);
      let minutes: number;
      if (value - (hours * 3600) > 0) {
        let subValue1 = value - (hours * 3600);
        minutes = Math.floor(subValue1 / 60);
      } else {
        minutes = 0;
      }
      return (
        // ("00" + hours).slice(-2) +
        // " giờ " +
        ("00" + minutes).slice(-2) +
        " phút " +
        ("00" + Math.floor(value - minutes * 60)).slice(-2) +
        " giây "
      );
    }
  }
}
