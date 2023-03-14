export interface OrionEngine {
  audio: AudioEngineInterface;
  game_data: GameDataManagerInterface;
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
  game_uuid: string;
}

export interface GameDataManagerInterface {
  game_data: any | null;
  uuid: string;
  save_game: () => void;
  load_game: () => any | null;
  get_raw: () => string;
  create_save_download: (format: 'json' | 'text') => string;
  set_game_data: (data: any) => void;
}

export type GameSaveFormat = 'json' | 'base64';
