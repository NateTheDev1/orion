import { AudioEngine } from './audio';
import { OrionEngine } from './types';

export * from './types';

export const Initialize = (): OrionEngine => {
  return {
    audio: new AudioEngine(),
  };
};
