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
    const dStart = new Date(Date.now()).getTime();
    const dEnd = (new Date(this.endTime)).setHours((new Date(this.endTime)).getHours() - 5);
    this.timer = (dEnd - dStart) / 1000;

    if (this.timer < 0) {
      this.timer = 0;
    }

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
