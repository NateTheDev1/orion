<a href="https://www.npmjs.com/package/orion-engine"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white&label=View%20On" /></a>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB&label=Powered%20By)

- [About](#about)
- [How to install](#how-to-install)
  - [How to use](#how-to-use)
  - [Hooks](#hooks)
  - [Audio Engine](#audio-engine)
    - [Methods](#methods)
  - [Game Data Manager](#game-data-manager)
    - [Constructor](#constructor)
    - [Methods](#methods-1)
    - [Properties](#properties)
  - [Input Manager](#input-manager)
    - [Methods](#methods-2)
    - [Properties](#properties-1)
  - [Debugger](#debugger)
    - [Methods](#methods-3)
  - [Time](#time)
    - [Methods](#methods-4)
    - [Properties](#properties-2)
- [Screen](#screen)
  - [Methods](#methods-5)
- [Localization](#localization)
  - [Methods](#methods-6)
  - [Properties](#properties-3)

## About

OrionEngine is a simple and lightweight web based game development library. It is not a full 'engine', however it contains useful tools to aid you in development. It is completely open-source and you can view more about it here on our [Github](https://github.com/NateTheDev1/orion)

## How to install

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

## Hooks

`useLocalization`

This returns an array with two functions and is used like useState.

```tsx
const [t, setLanguage] = useLocalization('en', {
  en: {
    'home.title': 'Welcome!',
  },
  es: {
    'home.title': '¡Bienvenido!',
  },
});

return (
  <div>
    <p>{t('home.title')}</p> // Results in <p>Welcome!</p>
  </div>
);
```

The hook takes two arguments:

`initialLanguage: string`: the default language to use for translations.

`translations: Record<string, TranslationMap>`: an object containing translation key-value pairs for different languages.

## Audio Engine

The Orion `AudioEngine` provides useful methods to playing audio, music, fading, and caching sources. A list of audio sources you want to cache can be provided in the orion config property at the OrionEngine HOC.

### Methods

- The cache_audio method takes an array of URLs as input and uses the fetch API to retrieve the audio data for each URL. It then decodes the audio data using the AudioContext interface and caches the resulting AudioBuffer objects in the \_cached_buffers map.

- The play_sound method plays an audio file with the given URL using the AudioBufferSourceNode interface. It first checks if the audio file has already been cached and retrieves the AudioBuffer object from the \_cached_buffers map if it has. If not, it fetches the audio data and decodes it before caching it. The method then creates a new AudioBufferSourceNode, sets its buffer to the AudioBuffer object, and connects it to the audio context. If use_fade is set to true, it calls the fade_sound_after_delay method to fade out the sound after it has finished playing. The method returns the index of the source in the \_sources array.

- The fade_sound method fades out the sound with the given source_id using a GainNode. It first checks if the source at the given source_id index is valid. If it is, it creates a new GainNode and connects the source to it. It then uses the linearRampToValueAtTime method of the GainNode to fade out the sound over the specified duration. Finally, it stops the source after the fade out is complete.

- The fade_sound_after_delay method is similar to the fade_sound method but fades out the sound after the duration of the sound has passed.

- The stop_sound method stops the sound with the given source_id index if it is valid.

- The stop_all_sounds method stops all currently playing sounds by calling the stop method on each AudioBufferSourceNode in the \_sources array and then empties the array.

- The set_pitch method sets the pitch of the sound with the given source ID.

- The set_loop method enables or disables looping for the sound with the given source ID.

- The apply_distortion method applies distortion effect to the sound with the given source ID.

- The apply_reverb method applies reverb effect to the sound with the given source ID.

- The apply_chorus method applies chorus effect to the sound with the given source ID.

- The apply_equalizer method applies an equalizer effect to the sound with the given source ID.

## Game Data Manager

The Orion `GameDataManager` provides helpful tools to save data in JSON or base64 format. It also provides methods to create downloadable save files for your users.

### Constructor

> The GameDataManager constructor accepts two parameters:

`uuid`: A string representing the UUID of the game data to manage.

`format`: A string representing the format of the game data to be saved. Defaults to 'json'.

### Methods

`save_game(): void`

Saves the game data to local storage.

`load_game(): any | null`

Loads the game data from local storage.

`set_game_data(data: any): void`

Sets the game data manually.

`get_raw(): string`

Retrieves the raw game data from local storage.

`create_save_download(format: 'json' | 'text'): string`

Creates a download URL for the current game data in the specified format.

### Properties

`game_data`

An any type that holds the game data that has been loaded or set. Returns null if there is no game data loaded or set.

`uuid`

A string representing the UUID of the game data being managed.

## Input Manager

The InputManager class provides functionality for handling user input, including keyboard and mouse events.

### Methods

`is_key_down(key_code: KeyCode): boolean`

Returns a boolean indicating whether the specified key is currently held down.

`is_mouse_button_down(button: MouseButton): boolean`

Returns a boolean indicating whether the specified mouse button is currently held down.

`get_key_code_from_string(key: string): KeyCode | null`

Converts a string key code to a KeyCode value. Returns null if the key code is not recognized.

`get_mouse_button_from_number(button: number): MouseButton | null`

Converts a numeric mouse button code to a MouseButton value. Returns null if the mouse button is not recognized.

`listen_key_up(key: KeyCode, callback: (key_code: KeyCode) => void)`

Listens for a key up event on the specified key code and executes a callback function when the event is triggered. The function receives the key code as a parameter.

### Properties

`keys_down`

An object containing key codes for all keys that are currently held down.

`mouse_position`

An object containing the current position of the mouse.

`mouse_buttons_down`

An object containing boolean values for all mouse buttons that are currently held down.

## Debugger

The Debugging class provides functionality for logging messages, warnings, and errors to the console and saving them to a log buffer. It also provides an assertion method to check conditions and log an error if the condition is false. The log buffer can be saved to local storage, and a log file can be generated for download.

### Methods

`log(message: string)`

Logs a message to the console and saves it to the log buffer.

`warn(message: string)`

Logs a warning message to the console and saves it to the log buffer.

`error(message: string, error?: Error)`

Logs an error message to the console and saves it to the log buffer.

`assert(condition: boolean, message: string)`

Checks a condition and logs an assertion error message to the console and saves it to the log buffer if the condition is false.

`generate_log_file()`

Generates a log file and returns the download URL.

## Time

The Time class is a utility that helps manage time-related operations. It includes the ability to start, pause, and resume time, as well as update the time system. The class also provides several properties to track the current state of time, such as delta time, time scale, elapsed time, and current time.

### Methods

`start(): void`

Starts the time system.

`pause(): void`

Pauses the time system.

`resume(): void`

Resumes the time system.

`update(): void`

Updates the time system.

### Properties

`delta_time: number`

Gets the delta time between the current and previous frame.

`time_scale: number`

Gets or sets the time scale of the time system.

`elapsed_time: number`

Gets the elapsed time since the time system was started.

`current_time: number`

Gets the current time in milliseconds.

## Screen

The screen utility helps keep track of width, height, resolution, fullscreen options, and provides a simple callback for resizing.

### Methods

`getScreenWidth(): number`

Returns the current screen width.

`getScreenHeight(): number`

Returns the current screen height.

`setResolution(width: number, height: number, fullscreen: boolean): void`

Sets the screen resolution to the specified width and height. If fullscreen is true, the screen will enter fullscreen mode.

`onResize(callback: () => void): void`

Registers a callback function to be called when the screen is resized. The callback function will receive no arguments.

## Localization

This code defines a Localization class that implements the LocalizationInterface. It allows for loading and translating string values for different languages.

- The constructor sets the default language and the translations object for the Localization instance.

### Methods

`load_translations(language: string, translations: TranslationMap): void`

loads the translations for a given language by setting the translations object property.

`translate(key: string, language?: string): string`

translates a given key into the current language, or a specified language if provided. It returns the translated string for the given key and language, or the original key if no translation is found.

`set_current_language(language: string): void`

sets the current language for translations.

### Properties

`current_language`

Provides the current language in use

## Profiler

The profiler helps provide useful methods to track FPS and generate performance reports.
