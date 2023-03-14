import { AudioEngineInterface } from './types';

export class AudioEngine implements AudioEngineInterface {
  private _context: AudioContext;
  private _sources: AudioBufferSourceNode[];

  constructor() {
    this._context = new AudioContext();
    this._sources = [];
  }

  get context(): AudioContext {
    return this._context;
  }

  get sources(): AudioBufferSourceNode[] {
    return this._sources;
  }

  public async play_sound(url: string, use_fade: boolean): Promise<number> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
    const source = this.context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.context.destination);
    source.start();
    this.sources.push(source);

    if (use_fade) {
      this.fade_sound_after_delay(this.sources.indexOf(source), source.buffer.duration);
    }

    return this.sources.indexOf(source);
  }

  fade_sound(source_id: number, duration: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }

    const source = this.sources[source_id];

    const currentTime = this.context.currentTime;
    const gainNode = this.context.createGain();
    source.connect(gainNode);
    gainNode.connect(this.context.destination);
    gainNode.gain.setValueAtTime(1, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
    setTimeout(() => {
      source.stop();
    }, (currentTime + duration - this.context.currentTime) * 1000);
  }

  fade_sound_after_delay(source_id: number, duration: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }

    const source = this.sources[source_id];

    const currentTime = this.context.currentTime;
    const gainNode = this.context.createGain();
    source.connect(gainNode);
    gainNode.connect(this.context.destination);
    gainNode.gain.setValueAtTime(1, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
    setTimeout(() => {
      source?.stop();
    }, (currentTime + duration - this.context.currentTime) * 1000);
  }

  stop_sound(source_id: number): void {}

  stop_all_sounds(): void {}
}
