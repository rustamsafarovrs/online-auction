import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: [ './countdown.component.scss' ]
})
export class CountdownComponent implements OnInit {

  @Input() endTime: string;

  endsString = '00:00:00';
  timer = 0;

  constructor() {
  }

  ngOnInit(): void {
    // const now = moment();
    // this.timer = moment(this.endTime).diff(now);
    // const utcDate = new Date(this.endTime)
    // // const seconds = ((millis % 60000) / 1000).toFixed(0);
    // // console.log(millis);
    //
    // var utc = Math.floor(utcDate.getTime() * 1000 / 1000)
    // console.log(utc);
    // console.log(Date.now());
    //
    // this.timer = utc - Date.now();
    // console.log(Date.now());

    // console.log(this.endTime);
    console.log(new Date(Date.now()));
    console.log(new Date(this.endTime));
    let dStart = new Date(Date.now()).getTime();
    let dEnd = (new Date(this.endTime)).setHours((new Date(this.endTime)).getHours() - 5);
    this.timer = (dEnd - dStart) / 1000;


    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      }
    });
  }

}
