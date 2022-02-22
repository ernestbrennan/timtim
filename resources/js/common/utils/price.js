import {advTypes} from './realty'
import {currencies} from '$js/config'
import {t} from "@lingui/macro";

export function getRealtyPriceText(advType, currency, price) {

  if (advType === advTypes.rent) {
    return `${formatToCorrectPrice(price)} ${t`${currencies[currency].label.toLowerCase()}/month`}`;
  }

  if (advType === advTypes.sale) {
    return `${formatToCorrectPrice(price)}${currencies[currency].symbol}`;
  }
}

export function formatToCorrectPrice(value) {
  return String(value)
    .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    .trim();
}