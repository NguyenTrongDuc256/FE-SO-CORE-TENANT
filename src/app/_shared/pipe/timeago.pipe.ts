import { Pipe, PipeTransform } from '@angular/core';
import { translate } from "@ngneat/transloco";

@Pipe({ name: 'timeago' })
export class TimeagoPipe implements PipeTransform {
  transform(d: any): string {

    let currentDate = new Date(new Date().toUTCString());
    let date = new Date(d*1000);

    let year = currentDate.getFullYear() - date.getFullYear();
    let month = currentDate.getMonth() - date.getMonth();
    let day = currentDate.getDate() - date.getDate();
    let hour = currentDate.getHours() - date.getHours();
    let minute = currentDate.getMinutes() - date.getMinutes();
    let second = currentDate.getSeconds() - date.getSeconds();

    let createdSecond = (year * 31556926) + (month * 2629746) + (day * 86400) + (hour * 3600) + (minute * 60) + second;

    if (createdSecond >= 31556926) {
      let yearAgo = Math.floor(createdSecond / 31556926);
      return yearAgo > 1 ? yearAgo + ` ${translate('yearAgo')}` : yearAgo + ` ${translate('yearAgo')}`;
    } else if (createdSecond >= 2629746) {
      let monthAgo = Math.floor(createdSecond / 2629746);
      return monthAgo > 1 ? monthAgo + ` ${translate('monthAgo')}` : monthAgo + ` ${translate('monthAgo')}`;
    } else if (createdSecond >= 86400) {
      let dayAgo = Math.floor(createdSecond / 86400);
      return dayAgo > 1 ? dayAgo + ` ${translate('dayAgo')}` : dayAgo + ` ${translate('dayAgo')}`;
    } else if (createdSecond >= 3600) {
      let hourAgo = Math.floor(createdSecond / 3600);
      return hourAgo > 1 ? hourAgo + ` ${translate('hourAgo')}` : hourAgo + ` ${translate('hourAgo')}`;
    } else if (createdSecond >= 60) {
      let minuteAgo = Math.floor(createdSecond / 60);
      return minuteAgo > 1 ? minuteAgo + ` ${translate('minuteAgo')}` : minuteAgo + ` ${translate('minuteAgo')}`;
    } else if (createdSecond < 60) {
      return createdSecond > 1 ? createdSecond + ` ${translate('secondAgo')}` : createdSecond + ` ${translate('secondAgo')}`;
    } else if (createdSecond < 0) {
      return `0 ${translate('secondAgo')}`;
    }
  }
}

