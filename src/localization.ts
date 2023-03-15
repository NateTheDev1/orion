import { LocalizationInterface, TranslationMap } from './types';

export class Localization implements LocalizationInterface {
  private _current_language: string;
  private _translations: Record<string, TranslationMap> = {};

  constructor(default_lang: string, translations: Record<string, TranslationMap>) {
    this._current_language = default_lang;
    this._translations = translations;
  }

  /**
   * Returns the current language being used for translations.
   * @returns The current language code.
   */
  get current_language() {
    return this._current_language;
  }

  /**
   * Loads translations for a given language code.
   * @param language - The language code to load translations for.
   * @param translations - An object containing translation key-value pairs for the given language.
   */
  public load_translations(language: string, translations: TranslationMap): void {
    this._translations[language] = translations;
  }

  /**
   * Translates a given key into the current language, or a specified language if provided.
   * @param key - The translation key.
   * @param language - The language code to use for translation, defaults to the current language.
   * @returns The translated string for the given key and language, or the original key if no translation is found.
   */
  public translate(key: string, language?: string): string {
    if (language && this._translations[language] && this._translations[language][key]) {
      return this._translations[language][key];
    }
    if (this._translations[this._current_language] && this._translations[this._current_language][key]) {
      return this._translations[this._current_language][key];
    }
    return key;
  }

  /**
   * Sets the current language for translations.
   * @param language - The language code to set as the current language.
   */
  public set_current_language(language: string): void {
    this._current_language = language;
  }
}
