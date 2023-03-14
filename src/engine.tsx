import React from 'react';
import { AudioEngine } from './audio';
import { OrionConfig, OrionEngine as EngineType } from './types';

const Initialize = (config: OrionConfig): EngineType => {
  return {
    audio: new AudioEngine(config.audio_source_urls),
  };
};

export const OrionEngine = (props: {
  children: React.ReactNode;
  engine_state: React.Dispatch<React.SetStateAction<any>>;
  config: OrionConfig;
}) => {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (!initialized) {
      const engine = Initialize(props.config);
      props.engine_state(engine);
      setInitialized(true);
    }
  }, []);

  return <>{props.children}</>;
};
