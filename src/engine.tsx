import React from 'react';
import { Initialize } from '.';

export const OrionEngine = (props: {
  children: React.ReactNode;
  engine_state: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (!initialized) {
      const engine = Initialize();
      props.engine_state(engine);
      setInitialized(true);
    }
  }, []);

  return <>{props.children}</>;
};
