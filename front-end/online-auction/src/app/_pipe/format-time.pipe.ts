import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    // MM:SS format
    // const minutes: number = Math.floor(value / 60);
    // return (
    //   ('00' + minutes).slice(-2) +
    //   ':' +
    //   ('00' + Math.floor(value - minutes * 60)).slice(-2)
    // );

    // for HH:MM:SS
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }
}
