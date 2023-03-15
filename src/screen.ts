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

  /**
   * Returns the screen width.
   * @returns The screen width.
   */
  public getScreenWidth(): number {
    return this._screenWidth;
  }

  /**
   * Returns the screen height.
   * @returns The screen height.
   */
  public getScreenHeight(): number {
    return this._screenHeight;
  }

  /**
   * Sets the screen resolution.
   * @param width The width of the screen.
   * @param height The height of the screen.
   * @param fullscreen Whether to enter fullscreen mode or not.
   */
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

  /**
   * Registers a callback function to be called when the screen is resized.
   * @param callback The callback function to be called when the screen is resized.
   */
  public onResize(callback: () => void): void {
    this._resizeCallbacks.push(callback);
  }
}
