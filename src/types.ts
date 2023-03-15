export interface OrionEngine {
  audio: AudioEngineInterface;
  game_data: GameDataManagerInterface;
  input_manager: InputManagerInterface;
  debug: DebugInterface;
  time: TimeInterface;
}

export interface TimeInterface {
  delta_time: number;
  time_scale: number;
  elapsed_time: number;
  current_time: number;

  start(): void;
  pause(): void;
  resume(): void;
  update(): void;
}

export interface DebugInterface {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  assert: (condition: boolean, message: string) => void;
  generate_log_file: () => string;
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

export type KeyCode =
  | 'Backquote'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'Digit0'
  | 'Minus'
  | 'Equal'
  | 'Backspace'
  | 'Tab'
  | 'KeyQ'
  | 'KeyW'
  | 'KeyE'
  | 'KeyR'
  | 'KeyT'
  | 'KeyY'
  | 'KeyU'
  | 'KeyI'
  | 'KeyO'
  | 'KeyP'
  | 'BracketLeft'
  | 'BracketRight'
  | 'Backslash'
  | 'CapsLock'
  | 'KeyA'
  | 'KeyS'
  | 'KeyD'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'Semicolon'
  | 'Quote'
  | 'Enter'
  | 'ShiftLeft'
  | 'KeyZ'
  | 'KeyX'
  | 'KeyC'
  | 'KeyV'
  | 'KeyB'
  | 'KeyN'
  | 'KeyM'
  | 'Comma'
  | 'Period'
  | 'Slash'
  | 'ShiftRight'
  | 'ControlLeft'
  | 'MetaLeft'
  | 'AltLeft'
  | 'Space'
  | 'AltRight'
  | 'MetaRight'
  | 'ContextMenu'
  | 'ControlRight'
  | 'Insert'
  | 'Home'
  | 'PageUp'
  | 'Delete'
  | 'End'
  | 'PageDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowDown'
  | 'ArrowRight'
  | 'NumLock'
  | 'NumpadDivide'
  | 'NumpadMultiply'
  | 'NumpadSubtract'
  | 'Numpad7'
  | 'Numpad8'
  | 'Numpad9'
  | 'NumpadAdd'
  | 'Numpad4'
  | 'Numpad5'
  | 'Numpad6'
  | 'Numpad1'
  | 'Numpad2'
  | 'Numpad3'
  | 'Numpad0'
  | 'NumpadDecimal'
  | 'IntlBackslash'
  | 'ContextMenu'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'AudioVolumeMute'
  | 'AudioVolumeDown'
  | 'AudioVolumeUp'
  | 'MediaTrackPrevious'
  | 'MediaTrackNext'
  | 'MediaStop'
  | 'MediaPlayPause'
  | 'NumpadEqual'
  | 'IntlYen';

export type MouseButton = 'Left' | 'Middle' | 'Right';

export interface InputManagerInterface {
  keys_down: { [key in KeyCode]: boolean };
  mouse_position: { x: number; y: number };
  mouse_buttons_down: { [key in MouseButton]: boolean };
  is_key_down: (key_code: KeyCode) => boolean;
  is_mouse_button_down: (button: MouseButton) => boolean;
  get_key_code_from_string: (key: string) => KeyCode | null;
  get_mouse_button_from_number: (button: number) => MouseButton | null;
  listen_key_up: (key: KeyCode, callback: (key_code: KeyCode) => void) => void;
}

export interface OrionConfig {
  audio_source_urls: string[];
  game_uuid: string;
  save_logs: boolean;
  start_game_time_on_create: boolean;
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
