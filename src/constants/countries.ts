export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  languageCode: string;
  languageName: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: '₹',
    languageCode: 'HI',
    languageName: 'Hindi (हिंदी)'
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    languageCode: 'EN',
    languageName: 'English'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    languageCode: 'EN',
    languageName: 'English'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    languageCode: 'DE',
    languageName: 'Deutsch'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currencyCode: 'EUR',
    currencySymbol: '€',
    languageCode: 'FR',
    languageName: 'Français'
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    currencyCode: 'EUR',
    currencySymbol: '€',
    languageCode: 'ES',
    languageName: 'Español'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    languageCode: 'EN',
    languageName: 'English'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    languageCode: 'EN',
    languageName: 'English'
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    languageCode: 'JA',
    languageName: '日本語 (Japanese)'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbol: 'AED ',
    languageCode: 'AR',
    languageName: 'العربية (Arabic)'
  }
];
