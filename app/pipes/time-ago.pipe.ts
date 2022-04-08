import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if (value) {
      const seconds = Math.floor(
        (+new Date() - +new Date(value)) / 1000
      );
      if (seconds < 60) {
        return "Just now";
      }
      const intervals = {
        Y: 365 * 24 * 60 * 60,
        M: (52 * 7 * 24 * 60 * 60) / 12,
        wk: 7 * 24 * 60 * 60,
        d: 24 * 60 * 60,
        h: 60 * 60,
        m: 60,
        s: 1
      };
      let counter;
      for (const i of Object.keys(intervals)) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + i + " ago";
          } else {
            return counter + i + " ago";
          }
        }
      }
    }
    return value;




  }

}
