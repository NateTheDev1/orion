import { ProfilerInterface } from './types';

export class Profiler implements ProfilerInterface {
  private startTimeMap: Record<string, number> = {};
  private endTimeMap: Record<string, number> = {};
  private frameCount = 0;
  private fps = 0;
  private lastFpsUpdateTime = 0;
  private fpsElement: HTMLElement | null = null;
  private fpsIntervalId: number | null = null;

  constructor(start_fps_tracker_at_start: boolean) {
    if (start_fps_tracker_at_start) {
      this.start_fps_tracking();
    }
  }

  public start(name: string): void {
    this.startTimeMap[name] = performance.now();
  }

  public end(name: string): void {
    this.endTimeMap[name] = performance.now();
  }

  public get_report(): Record<string, number> {
    const report: Record<string, number> = {};
    for (const name in this.startTimeMap) {
      if (this.endTimeMap[name]) {
        report[name] = this.endTimeMap[name] - this.startTimeMap[name];
      }
    }
    report['fps'] = this.fps;
    return report;
  }

  public start_fps_tracking(): void {
    const updateFps = () => {
      const timestamp = performance.now();
      if (timestamp - this.lastFpsUpdateTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastFpsUpdateTime = timestamp;
        if (this.fpsElement) {
          this.fpsElement.innerText = `FPS: ${this.fps}`;
        }
      }
      this.frameCount++;
    };
    this.fpsIntervalId = window.setInterval(updateFps, 16.67);
  }

  public show_fps_counter(parentElement: HTMLElement): void {
    if (!this.fpsElement) {
      this.fpsElement = document.createElement('div');
      this.fpsElement.style.position = 'fixed';
      this.fpsElement.style.top = '0';
      this.fpsElement.style.right = '0';
      this.fpsElement.style.backgroundColor = 'black';
      this.fpsElement.style.color = 'white';
      this.fpsElement.style.padding = '5px';
      parentElement.appendChild(this.fpsElement);
    }
  }

  public hide_fps_counter(): void {
    if (this.fpsElement) {
      this.fpsElement.remove();
      this.fpsElement = null;
    }
  }

  public disable_fps_counter(): void {
    if (this.fpsIntervalId) {
      clearInterval(this.fpsIntervalId);
    }
    this.hide_fps_counter();
  }
}
