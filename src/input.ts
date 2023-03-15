import { keys_static } from './static/static_input';
import { InputManagerInterface, KeyCode, MouseButton } from './types';

export class InputManager implements InputManagerInterface {
  private _keys_down: { [key in KeyCode]: boolean };
  private _mouse_position: { x: number; y: number };
  private _mouse_buttons_down: { [key in MouseButton]: boolean };

  get keys_down() {
    return this._keys_down;
  }

  get mouse_position() {
    return this._mouse_position;
  }

  get mouse_buttons_down() {
    return this._mouse_buttons_down;
  }

  constructor() {
    this._keys_down = { ...keys_static };
    this._mouse_position = { x: 0, y: 0 };
    this._mouse_buttons_down = { Left: false, Middle: false, Right: false };

    document.addEventListener('keydown', (event) => {
      const keyCode = this.get_key_code_from_string(event.code);
      if (keyCode) {
        this.keys_down[keyCode] = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyCode = this.get_key_code_from_string(event.code);
      if (keyCode) {
        this.keys_down[keyCode] = false;
      }
    });

    document.addEventListener('mousemove', (event) => {
      this._mouse_position = { x: event.clientX, y: event.clientY };
    });

    document.addEventListener('mousedown', (event) => {
      const mouseButton = this.get_mouse_button_from_number(event.button);
      if (mouseButton) {
        this.mouse_buttons_down[mouseButton] = true;
      }
    });

    document.addEventListener('mouseup', (event) => {
      const mouseButton = this.get_mouse_button_from_number(event.button);
      if (mouseButton) {
        this.mouse_buttons_down[mouseButton] = false;
      }
    });
  }

  /**
   * Checks if a specific key is currently held down.
   * @param key_code The key code to check.
   * @returns A boolean representing whether the key is currently held down.
   */
  is_key_down(key_code: KeyCode) {
    return this._keys_down[key_code];
  }

  /**
   * Checks if a specific mouse button is currently held down.
   * @param button The mouse button to check.
   * @returns A boolean representing whether the mouse button is currently held down.
   */
  is_mouse_button_down(button: MouseButton) {
    return this._mouse_buttons_down[button];
  }

  /**
   * Converts a string key code to a KeyCode value.
   * @param key The key code as a string.
   * @returns The KeyCode value, or null if the key code is not recognized.
   */
  get_key_code_from_string(key: string): KeyCode | null {
    return keys_static[key as KeyCode] ? (key as KeyCode) : null;
  }

  /**
   * Converts a numeric mouse button code to a MouseButton value.
   * @param button The mouse button code as a number.
   * @returns The MouseButton value, or null if the mouse button is not recognized.
   */
  get_mouse_button_from_number(button: number): MouseButton | null {
    return button === 0 ? 'Left' : button === 1 ? 'Middle' : button === 2 ? 'Right' : null;
  }

  /**
   * Listens for a key up event on a specific key code and executes a callback function when the event is triggered.
   * @param key The key code to listen for.
   * @param callback The function to execute when the key up event is triggered.
   * The function receives the key code as a parameter.
   */
  listen_key_up(key: KeyCode, callback: (key_code: KeyCode) => void) {
    document.addEventListener('keyup', (event) => {
      const keyCode = this.get_key_code_from_string(event.code);
      if (keyCode) {
        callback(keyCode);
      }
    });
  }
}
