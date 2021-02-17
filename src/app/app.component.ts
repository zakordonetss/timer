import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
    private _value: number = 0;
    private _shouldWait: boolean = false;
    private _sub: Subscription;
    private _timer$ = new Observable(observer => {
        setInterval(() => observer.next(), 1000);
    });

    public buttonName: string = 'Start';

    public get timerValue(): string {
        return this._formatTime(this._value);
    }

    public handleStart(): void {
        if (this._sub && !this._sub.closed) {
            this._stop();
            this._reset();
        } else this._start();
        this._setButtonName();
    }

    public handleWait(): void {
        if (this._shouldWait) {
            this._stop();
            this._setButtonName();
        } else {
            this._shouldWait = true;
            setTimeout(() => this._shouldWait = false, 300);
        }
    }

    public handleReset(): void {
        if (this._value) {
            this._stop();
            this._reset();
            this._start();
            this._setButtonName();
        } else return
    }

    private _start(): void {
        this._sub = this._timer$.subscribe(() => this._value++);
    }

    private _stop(): void {
        if (this._sub && !this._sub.closed) this._sub.unsubscribe();
    }

    private _reset(): void {
        this._value = 0;
    }

    private _setButtonName(): void {
        (this._sub && !this._sub.closed) ? this.buttonName = 'Stop' : this.buttonName = 'Start';
    }

    private _formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.round(seconds % 60);

        return [
            "0"+"0" + h,
            "0"+"0" + m,
            "0"+"0"+ s
        ].map(item => item.slice(-2)).join(':');
    }
}
