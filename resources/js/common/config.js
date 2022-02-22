const currencies = {
  usd: {
    label: 'ДОЛ',
    symbol: '$',
    value: 'usd',
  },
  sum: {
    label: 'СУМ',
    symbol: 'so\'m',
    value: 'sum',
  },
};

export const advTypes = {
  rent: 'rent',
  sale: 'sale'
}

const mapboxToken = 'pk.eyJ1Ijoia2VseWFubWVkaWEiLCJhIjoiY2twd2E0eXNqMDUxZzJ2cW1xMzRzOXpzaSJ9.FobHcyyQg2wXZXfFb_KH3w';

const googlePlayRentalsURL = '#';

const appStoreRentalsURL = '#';

const privacyPolicyURL = process.env.MIX_PUBLIC_URL +' /privacy_policy.html';
const termsURL = process.env.MIX_PUBLIC_URL + '/terms_of_use.html';
const onlineMagazineURL = '#';

const firebaseCredentials = {
  apiKey: process.env.MIX_FIREBASE_API_KEY,
  authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.MIX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.MIX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.MIX_FIREBASE_APP_ID,
  measurementId: process.env.MIX_FIREBASE_MEASUREMENt_ID,
};

export {
  currencies,
  mapboxToken,
  googlePlayRentalsURL,
  appStoreRentalsURL,
  privacyPolicyURL,
  termsURL,
  firebaseCredentials,
  onlineMagazineURL,
};
