import { ScreenInterface } from './types';

export class Screen implements ScreenInterface {
  private _screenWidth: number;
  private _screenHeight: number;
  private _resizeCallbacks: Array<() => void> = [];

  constructor() {
    this._screenWidth = window.innerWidth;
    this._screenHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      this._screenWidth = window.innerWidth;
      this._screenHeight = window.innerHeight;
      this._resizeCallbacks.forEach((callback: () => void) => callback());
    });
  }

  public getScreenWidth(): number {
    return this._screenWidth;
  }

  public getScreenHeight(): number {
    return this._screenHeight;
  }

  public setResolution(width: number, height: number, fullscreen: boolean): void {
    if (fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this._screenWidth = width;
    this._screenHeight = height;
    this._resizeCallbacks.forEach((callback) => callback());
  }

  public onResize(callback: () => void): void {
    this._resizeCallbacks.push(callback);
  }
}
