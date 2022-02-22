import React from 'react';
import { Trans } from '@lingui/macro';

const reduceById = (arr) =>
  arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

export { reduceById };

/**
 * returns millions and thousands from number in readable format
 * @param price number like 1768420
 * @returns string like '1 млн. 768 тыс. грн.'
 */
export function getPrettyPriceString(price) {
  let numberOfMillions = 0;
  let numberOfThousands;
  if (price >= 1000000) {
    numberOfMillions = Math.floor(price / 1000000);
  }
  numberOfThousands = Math.round((price - numberOfMillions * 1000000) / 1000);
  return (
    <>
      {numberOfMillions ? <Trans>{numberOfMillions}m. </Trans> : ''}{' '}
      <Trans>{numberOfThousands}k UAH</Trans>
    </>
  );
}

export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function prettyURL(url) {
  if (!url) {
    return null;
  }
  const protocolIndex = url.indexOf('://');
  const address = protocolIndex === -1 ? url : url.substring(protocolIndex + 3);
  const firstSlashIndex = address.indexOf('/');
  return firstSlashIndex === -1 ? address : address.substring(0, firstSlashIndex);
}
