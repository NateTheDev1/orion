import { GameDataManagerInterface, GameSaveFormat } from './types';

export class GameDataManager<T> implements GameDataManagerInterface<T> {
  private _uuid: string;
  private _game_data: T | null = null;
  private _format: GameSaveFormat;

  /**
   * Creates a new GameDataManager instance.
   * @param uuid UUID of the game data to manage.
   */
  constructor(uuid: string, format: GameSaveFormat = 'json') {
    this._uuid = uuid;
    this._format = format;
  }

  /**
   * Gets the game data.
   */
  get game_data(): T | null {
    return this._game_data;
  }

  /**
   * Gets the UUID of the game data.
   */
  get uuid(): string {
    return this._uuid;
  }

  /**
   * Saves the game data to local storage. Saves the latest data set by setGameData(). Ensure you have set the data first!
   */
  save_game(): void {
    if (this._game_data) {
      localStorage.setItem(
        this._uuid,
        this._format === 'json' ? JSON.stringify(this._game_data) : btoa(JSON.stringify(this._game_data)),
      );
    }
  }

  /**
   * Loads the game data from local storage.
   * @returns T of Game Data
   */
  load_game(): T | null {
    if (this._format === 'json') {
      return JSON.parse(localStorage.getItem(this._uuid) || 'null');
    } else {
      return JSON.parse(atob(localStorage.getItem(this._uuid) || 'null'));
    }
  }

  /**
   * Sets the game data manually.
   * @param data T of Game Data
   */
  setGameData(data: T): void {
    this._game_data = data;
  }

  get_raw(): string {
    return localStorage.getItem(this._uuid) || '';
  }
}
