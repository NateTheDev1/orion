import { useMemo, useState } from 'react';
import { Localization } from '../localization';
import { LocalizationInterface, TranslationMap } from '../types';

export function useLocalization(
  initialLanguage: string,
  translations: Record<string, TranslationMap>,
): [(key: string) => string, (language: string) => void] {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const localization = useMemo(() => {
    const localizationInstance: LocalizationInterface = new Localization(initialLanguage, translations);
    for (const language in translations) {
      localizationInstance.load_translations(language, translations[language]);
    }
    localizationInstance.set_current_language(currentLanguage);
    return localizationInstance;
  }, [translations, currentLanguage]);

  const translate = (key: string): string => {
    return localization.translate(key);
  };

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localization.set_current_language(language);
  };

  return [translate, setLanguage];
}
