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

  is_key_down(key_code: KeyCode) {
    return this._keys_down[key_code];
  }

  is_mouse_button_down(button: MouseButton) {
    return this._mouse_buttons_down[button];
  }

  get_key_code_from_string(key: string): KeyCode | null {
    return keys_static[key as KeyCode] ? (key as KeyCode) : null;
  }

  get_mouse_button_from_number(button: number): MouseButton | null {
    return button === 0 ? 'Left' : button === 1 ? 'Middle' : button === 2 ? 'Right' : null;
  }

  listen_key_up(key: KeyCode, callback: (key_code: KeyCode) => void) {
    document.addEventListener('keyup', (event) => {
      const keyCode = this.get_key_code_from_string(event.code);
      if (keyCode) {
        callback(keyCode);
      }
    });
  }
}
