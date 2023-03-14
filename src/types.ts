export interface OrionEngine {
  audio: AudioEngineInterface;
}

export interface AudioEngineInterface {
  context: AudioContext;
  sources: AudioBufferSourceNode[];
  play_sound: (url: string, use_fade: boolean) => Promise<number>;
  fade_sound: (source_id: number, duration: number) => void;
  fade_sound_after_delay: (source_id: number, duration: number) => void;
  stop_sound: (source_id: number) => void;
  stop_all_sounds: () => void;
}