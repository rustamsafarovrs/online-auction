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

  endsString = '00:00:00';

  constructor() {
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000).subscribe(() => {
      const now = moment();
      const diff = moment(this.endTime).diff(now);
      if (diff < 0) {
        return;
      }
      this.endsString = moment(diff).format('HH:mm:ss');
    });
  }

}
