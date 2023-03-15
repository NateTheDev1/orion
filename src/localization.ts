import { LocalizationInterface, TranslationMap } from './types';

export class Localization implements LocalizationInterface {
  private _current_language: string;
  private _translations: Record<string, TranslationMap> = {};

  constructor(default_lang: string, translations: Record<string, TranslationMap>) {
    this._current_language = default_lang;
    this._translations = translations;
  }

  get current_language() {
    return this._current_language;
  }

  public load_translations(language: string, translations: TranslationMap): void {
    this._translations[language] = translations;
  }

  public translate(key: string, language?: string): string {
    if (language && this._translations[language] && this._translations[language][key]) {
      return this._translations[language][key];
    }
    if (this._translations[this._current_language] && this._translations[this._current_language][key]) {
      return this._translations[this._current_language][key];
    }
    return key;
  }

  public set_current_language(language: string): void {
    this._current_language = language;
  }
}
