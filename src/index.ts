import { AudioEngine } from './audio';
import { OrionEngine as EngineType } from './types';

// Exports

export * from './types';

export const Initialize = (): EngineType => {
  return {
    audio: new AudioEngine(),
  };
};

export { OrionEngine } from './engine';
