import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
    timerValue;

    handleStart() {
        console.log('start');
    }

    handleWait() {

    }

    handleReset() {

    }
}
