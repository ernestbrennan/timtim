import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';

export async function activateLanguage(locale) {
  try {
    const { messages } = await import(`../locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
  } catch (error) {
    throw new Error(`${locale} is not a  supported locale`);
  }
}

export const SupportedLanguageCodes = {
  ru: 'ru',
  uz: 'uz',
};

export function isSupportedLanguage(languageCode) {
  return Object.values(SupportedLanguageCodes).includes(languageCode);
}

export const getDefaultPageTitle = () =>
  t`TimTim: apartments for rent and sale in Kiev, Odessa, Kharkov, Dnipro, Lviv`;
export const getDefaultMetaDescription = () =>
  t`TimTim is a service for renting and selling apartments in Ukraine. We collect all offers for rent and sale on our website and in the mobile application. We have convenient filters with which you can easily find and quickly rent or buy an apartment in Kiev, Odessa, Kharkov, Dnipro and Lviv.`;
export const getDefaultMetaKeywords = () => '';
