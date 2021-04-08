import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() endTime: string;

  endsString;

  constructor() {
  }

  ngOnInit(): void {
    this.init();

    this.startCountdown();
  }

  private init(): void {
    const now = moment();
    const diff = moment(this.endTime).diff(now);
    this.endsString = moment(diff).format('HH:mm:ss');
  }

  private startCountdown(): void {
    interval(1000).subscribe(() => {
      const now = moment();
      const diff = moment(this.endTime).diff(now);
      this.endsString = moment(diff).format('HH:mm:ss');
    });
  }

}
