export interface OrionEngine {
  audio: AudioEngineInterface;
}

export interface AudioEngineInterface {
  context: AudioContext;
  sources: AudioBufferSourceNode[];
  cached_buffers: Map<string, AudioBuffer>;
  cache_audio: (urls: string[]) => Promise<void>;
  play_sound: (url: string, use_fade: boolean) => Promise<number>;
  fade_sound: (source_id: number, duration: number) => void;
  fade_sound_after_delay: (source_id: number, duration: number) => void;
  stop_sound: (source_id: number) => void;
  stop_all_sounds: () => void;
}

export interface OrionConfig {
  audio_source_urls: string[];
}

export interface GameDataManagerInterface<T> {
  game_data: T | null;
  uuid: string;
  save_game: () => void;
  load_game: () => T | null;
  get_raw: () => string;
}

export type GameSaveFormat = 'json' | 'base64';
