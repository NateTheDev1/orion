# About

OrionEngine is a simple and lightweight web based game development library. It is not a full 'engine', however it contains useful tools to aid you in development. It is completely open-source and you can view more about it here on our [Github](https://github.com/NateTheDev1/orion)

# How to install

Typescript typings are already included with the build

```bash
npm i orion-engine
```

## How to use

The core component of Orion is the OrionEngine higher order component. It should be placed somewhere in your root component and contain your app's children.

> The `engine_state` parameter is where you include your state function to set the engine variable in your app.

```tsx
import React from 'react';

const config: OrionConfig = {
    ...
};

const App = () => {
  const [engine, setEngine] = useState<any>(null);

  return (
    <OrionEngine engine_state={setEngine} config={config}>
      <p>My app</p>
      <p>Welcome!</p>
    </OrionEngine>
  );
};
```

## Audio Engine

The Orion audio engine provides useful methods to playing audio, music, fading, and caching sources. A list of audio sources you want to cache can be provided in the orion config property at the OrionEngine HOC.
