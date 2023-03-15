import React from 'react';
import { AudioEngine } from './audio';
import { Debugging } from './debug';
import { InputManager } from './input';
import { Localization } from './localization';
import { MathUtility } from './math';
import { Profiler } from './profiler';
import { GameDataManager } from './save';
import { Screen } from './screen';
import { Time } from './time';
import { OrionConfig, OrionEngine as EngineType } from './types';

const Initialize = (config: OrionConfig): EngineType => {
  return {
    audio: new AudioEngine(config.audio_source_urls),
    game_data: new GameDataManager(config.game_uuid),
    input_manager: new InputManager(),
    debug: new Debugging(config.save_logs, config.game_uuid),
    time: new Time(config.start_game_time_on_create),
    localization: new Localization(config.default_language, config.translations),
    screen: new Screen(),
    profiler: new Profiler(config.use_fps_tracker_at_start),
    //@ts-ignore
    math: new MathUtility(), // class implements static methods and uses @staticImplements<MathInterface>() decorator
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
