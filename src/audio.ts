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

  /**
   * Set the pitch of the sound with the given source ID.
   * @param source_id Source ID of the sound to modify the pitch.
   * @param pitch Pitch of the sound. Should be a positive number.
   */
  set_pitch(source_id: number, pitch: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }
    const source = this.sources[source_id];
    source.playbackRate.value = pitch;
  }

  /**
   * Enable or disable looping for the sound with the given source ID.
   * @param source_id Source ID of the sound to enable or disable looping.
   * @param loop Whether to enable or disable looping for the sound.
   */
  set_loop(source_id: number, loop: boolean): void {
    if (this.sources[source_id] === undefined) {
      return;
    }
    const source = this.sources[source_id];
    source.loop = loop;
  }

  /**
   * Apply distortion effect to the sound with the given source ID.
   * @param source_id Source ID of the sound to apply the distortion effect.
   * @param amount Amount of distortion to apply to the sound.
   */
  apply_distortion(source_id: number, amount: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }
    const source = this.sources[source_id];
    const distortion = this.context.createWaveShaper();
    distortion.curve = this.make_distortion_curve(amount);
    source.connect(distortion);
    distortion.connect(this.context.destination);
  }

  /**
   * Helper function to create a distortion curve
   * @param amount
   * @returns
   */
  private make_distortion_curve(amount: number): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    let x;
    for (let i = 0; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  /**
   * Apply reverb effect to the sound with the given source ID.
   * @param source_id Source ID of the sound to apply the reverb effect.
   * @param duration Duration of the reverb effect in seconds.
   * @param decay Rate at which the reverb trails off after the sound stops.
   */
  apply_reverb(source_id: number, duration: number, decay: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }
    const source = this.sources[source_id];
    const convolver = this.context.createConvolver();
    const rate = this.context.sampleRate;
    const length = rate * duration;
    const impulse = this.context.createBuffer(2, length, rate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const t = i / rate;
      impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - t / duration, decay);
      impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - t / duration, decay);
    }

    convolver.buffer = impulse;
    source.connect(convolver);
    convolver.connect(this.context.destination);
  }

  /**
   * Apply chorus effect to the sound with the given source ID.
   * @param source_id Source ID of the sound to apply the chorus effect.
   * @param delay Time delay between the original sound and the chorus sound in seconds.
   * @param depth Depth of the chorus effect. Should be between 0 and 1.
   * @param rate Frequency of the LFO that modulates the delay time in Hz.
   */
  apply_chorus(source_id: number, delay: number, depth: number, rate: number): void {
    if (this.sources[source_id] === undefined) {
      return;
    }
    const source = this.sources[source_id];

    if (!source.buffer) {
      return;
    }

    const dryGain = this.context.createGain();
    const wetGain = this.context.createGain();
    const lfo = this.context.createOscillator();
    const delayNode = this.context.createDelay();

    // Connect the source to the dry and wet gains
    source.connect(dryGain);
    source.connect(wetGain);

    // Set up the LFO
    lfo.type = 'sine';
    lfo.frequency.value = rate;
    lfo.start();

    // Set up the delay node
    delayNode.delayTime.value = delay;

    // Connect the LFO to the delay time and connect the delay node to the wet gain
    lfo.connect(delayNode.delayTime);
    delayNode.connect(wetGain);

    // Set up the dry and wet gains and connect them to the destination
    dryGain.connect(this.context.destination);
    wetGain.connect(this.context.destination);
    dryGain.gain.value = 1 - depth;
    wetGain.gain.value = depth;

    // Connect the wet gain to the delay node
    wetGain.connect(delayNode);

    // Start the source and the LFO
    source.start();

    // Stop the source and the LFO after the sound has finished playing
    setTimeout(() => {
      source.stop();
      lfo.stop();
    }, source.buffer.duration * 1000);
  }

  /**
   * Apply an equalizer effect to the sound with the given source ID.
   * @param source_id Source ID of the sound to apply the equalizer effect.
   * @param bands An array of gain values for each frequency band.
   */
  apply_equalizer(source_id: number, bands: number[]): void {
    if (this.sources[source_id] === undefined) {
      return;
    }

    const source = this.sources[source_id];
    const eq = this.context.createBiquadFilter();
    eq.type = 'peaking';

    const frequencies = [60, 170, 350, 1000, 3500, 10000];
    const q = 2.5;

    // Set up the frequency and Q values for each band
    for (let i = 0; i < bands.length; i++) {
      eq.frequency.setValueAtTime(frequencies[i], this.context.currentTime);
      eq.gain.setValueAtTime(bands[i], this.context.currentTime);
      eq.Q.setValueAtTime(q, this.context.currentTime);
      source.connect(eq);
    }

    eq.connect(this.context.destination);
  }
}
