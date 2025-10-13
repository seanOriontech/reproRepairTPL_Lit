import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    return date.toLocaleString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
