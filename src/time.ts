import { TimeInterface } from './types';

export class Time implements TimeInterface {
  private _is_running: boolean = false;
  private _last_time: number = 0;
  private _pause_time: number = 0;
  private _delta_time: number = 0;
  private _time_scale: number = 1.0;
  private _elapsed_time: number = 0;
  private _current_time: number = 0;

  constructor(start_time_on_creation: boolean = true) {
    if (start_time_on_creation) {
      this.start();
    }
  }

  get delta_time(): number {
    return this._delta_time;
  }

  get time_scale(): number {
    return this._time_scale;
  }

  set time_scale(value: number) {
    this._time_scale = value;
  }

  get elapsed_time(): number {
    return this._elapsed_time;
  }

  get current_time(): number {
    return this._current_time;
  }

  start(): void {
    this._is_running = true;
    this._last_time = performance.now();
    this._pause_time = 0;
    this._delta_time = 0;
    this._time_scale = 1.0;
    this._elapsed_time = 0;
    this._current_time = 0;
  }

  pause(): void {
    if (this._is_running) {
      this._is_running = false;
      this._pause_time = performance.now();
    }
  }

  resume(): void {
    if (!this._is_running) {
      this._is_running = true;
      this._last_time += performance.now() - this._pause_time;
    }
  }

  update(): void {
    if (!this._is_running) {
      return;
    }

    const now = performance.now();
    this._delta_time = ((now - this._last_time) / 1000) * this._time_scale;
    this._elapsed_time += this._delta_time;
    this._current_time = this._elapsed_time * 1000;
    this._last_time = now;
  }
}
