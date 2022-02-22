import React from 'react';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import Fuse from 'fuse.js';
import { flatten } from 'ramda';

import RealtyListPage from '$app/pages/realty-list';
import ComplexListPage from '$app/pages/complex-list';

import { advTypes } from '$js/utils/realty';
import Routes from './routes';
import { SupportedLanguageCodes } from './localization';
import { TokenTypes } from '$app/redux/const/const';
import {onRoomFilterValueAdded} from '$app/redux/actions/uiActions';

const roomNumberTokens = [
  'odnokomnatnaya-kvartira',
  'odnokomnatnaia-kvartira',
  'dvukhkomnatnaya-kvartira',
  'dvukhkomnatnaia-kvartira',
  'trekhkomnatnaia-kvartira',
  'tryohkhkomnatnaya-kvartira',
  'chyotiryokhkomnatnaya-kvartira',
  'chetyrekhkomnatnaia-kvartira',
];

function transliterateLatinTokenValueToCyrillic(text) {
  const sanitizedText = text.replace(/[-_]/g, ' ');
  return cyrillicToTranslit().reverse(sanitizedText);
}

export function findLatinInCyrillicCollection({ cyrillicCollection, latinString, cyrillicKey }) {
  const transliteratedLatin = transliterateLatinTokenValueToCyrillic(latinString);

  const fuseOptions = { keys: [cyrillicKey], threshold: 0.7 };
  const fuse = new Fuse(cyrillicCollection, fuseOptions);

  const results = fuse.search(transliteratedLatin);

  return results[0]?.item;
}

export function parseLandingPageTokens(params) {
  return (
    params
      // eslint-disable-next-line array-callback-return
      .map((param) => {
        const sanitizedParam = param.replace('/', '');

        if (['rent', 'sale', 'complexes', 'complex'].includes(sanitizedParam)) {
          return { type: 'advType', value: sanitizedParam };
        }
        if (roomNumberTokens.includes(sanitizedParam)) {
          switch (sanitizedParam) {
            case 'odnokomnatnaya-kvartira':
            case 'odnokomnatnaia-kvartira':
              return { type: 'roomsNumber', value: 1 };
            case 'dvukhkomnatnaya-kvartira':
            case 'dvukhkomnatnaia-kvartira':
              return { type: 'roomsNumber', value: 2 };
            case 'tryokhkomnatnaya-kvartira':
            case 'trekhkomnatnaia-kvartira':
              return { type: 'roomsNumber', value: 3 };
            case 'chyotiryokhkomnatnaya-kvartira':
            case 'chetyrekhkomnatnaia-kvartira':
              return { type: 'roomsNumber', value: 4 };
            default:
              return undefined;
          }
        }
        if (
          [
            SupportedLanguageCodes.ru,
            SupportedLanguageCodes.uz,
          ].includes(sanitizedParam)
        ) {
          return { type: 'language', value: sanitizedParam };
        }
        if (!/([-_])/g.test(param)) {
          return { type: 'cityName', value: sanitizedParam };
        }
      })
      .filter((item) => Boolean(item))
  );
}

export function getCityIdFromTokenValue(value, cities) {
  return cities.find((city) => city.slug.toLowerCase() === value || city.id === Number(value))
    ?.id; // fixes cases with old (numerical city id) city cookies
}

export function getRegionIdFromTokenValue(value, regions) {
  // regions slug_seo like :"obolonskii-raion"
  // subway slug_seo like :"darnytsia"
  const shortSearchResult = regions.find((value) => {
    return value.slug_seo && value.slug_seo.toLowerCase().replace('raion', '') === value;
  });
  if (shortSearchResult) {
    return shortSearchResult;
  }
  return findLatinInCyrillicCollection({
    cyrillicCollection: regions,
    cyrillicKey: 'name',
    latinString: value,
  });
}

export function getSubwayIdFromTokenValue(value, subways) {
  return subways.find((subway) => subway.slug_seo.toLowerCase() === value);
}

let urlParamsAlreadySet = false;

export function getRequiredActionsFromTokens({ parsedTokens, regions, subways, cities }) {
  if (urlParamsAlreadySet) {
    return [];
  }
  urlParamsAlreadySet = true; //TODO: refactor

  const result = parsedTokens
    // eslint-disable-next-line array-callback-return
    .map((token) => {
      const { type, value } = token;
      switch (type) {
        case TokenTypes.advType: {
          //return onAdvTypeChanged(value); // TODO: should this be used or leave this feature in SearchPanel?
          break;
        }
        case TokenTypes.roomsNumber: {
          return onRoomFilterValueAdded(value);
        }
        default:
          return undefined;
      }
    })
    .filter((item) => Boolean(item));
  return flatten(result);
}

export function getComponentForTokens(tokens) {
  const advType = tokens.find((token) => token.type === TokenTypes.advType)?.value;
  if (advType === advTypes.complexes || advType === 'complex') {
    return <ComplexListPage />;
  }
  return <RealtyListPage />;
}

export function pathnameHasCityName(pathname) {
  return !(pathname.split('/').length === 3);
}

export function getRedirectUrlForTokens(tokens) {
  const advType = tokens.find((token) => token.type === TokenTypes.advType)?.value;
  switch (true) {
    case advType === advTypes.complexes || advType === 'complex': {
      return Routes.complexList;
    }
    case advType === advTypes.RENT: {
      return Routes.rent;
    }
    case advType === advTypes.SALE: {
      return Routes.sale;
    }
    default: {
      return Routes.index;
    }
  }
}
