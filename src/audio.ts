import { AudioEngineInterface } from './types';

export class AudioEngine implements AudioEngineInterface {
  private _context: AudioContext;
  private _sources: AudioBufferSourceNode[];
  private _cached_buffers: Map<string, AudioBuffer>;

  /**
   * Creates a new AudioEngine instance.
   * @param to_cache URLs of the sounds to cache if any.
   */
  constructor(to_cache: string[] = []) {
    this._context = new AudioContext();
    this._sources = [];
    this._cached_buffers = new Map();

    if (to_cache.length > 0) {
      this.cache_audio(to_cache);
    }
  }

  /**
   * Caches the sounds with the given URLs.
   * @param urls URLs of the sounds to cache.
   */
  async cache_audio(urls: string[]): Promise<void> {
    const promises = urls.map((url) => {
      return new Promise<void>(async (resolve) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
        this._cached_buffers.set(url, audioBuffer);
        resolve();
      });
    });

    await Promise.all(promises);
  }

  get context(): AudioContext {
    return this._context;
  }

  get sources(): AudioBufferSourceNode[] {
    return this._sources;
  }

  get cached_buffers(): Map<string, AudioBuffer> {
    return this._cached_buffers;
  }

  /**
   * Plays the sound with the given URL.
   * @param url URL of the sound to play.
   * @param use_fade Whether to fade the sound out after it has finished playing.
   * @returns
   */
  public async play_sound(url: string, use_fade: boolean): Promise<number> {
    let audioBuffer: AudioBuffer;

    // Check if audio buffer is cached
    if (this._cached_buffers.has(url)) {
      audioBuffer = this._cached_buffers.get(url)!;
    } else {
      // Fetch and decode audio data
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await this.context.decodeAudioData(arrayBuffer);

      // Cache the audio buffer
      this._cached_buffers.set(url, audioBuffer);
    }

    // Create new AudioBufferSourceNode and connect it to the audio context
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

  /**
   * Fade the sound with the given source ID.
   * @param source_id Source ID of the sound to fade.
   * @param duration Duration of the fade in seconds.
   * @returns
   */
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

  /**
   * Fade the sound with the given source ID after the duration of the sound.
   * @param source_id Source ID of the sound to fade.
   * @param duration Duration of the fade in seconds.
   * @returns
   */
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

  /**
   * Stops the sound with the given source ID.
   * @param source_id Source ID of the sound to stop.
   * @returns
   */
  stop_sound(source_id: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }

    const source = this.sources[source_id];
    source.stop();
  }

  /**
   * Stops all sounds that are currently playing.
   */
  stop_all_sounds(): void {
    this._sources.forEach((source) => {
      source.stop();
    });
    this._sources = [];
  }
}
