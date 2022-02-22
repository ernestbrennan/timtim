import { currencies, advTypes } from '$js/config';
import { t } from '@lingui/macro';

const formatPrice = (value) => (value !== null ? value.toLocaleString() : '');

const getPrice = (advType, { price_uah, price_usd }) => {
  let price;
  let currency;
  switch (advType) {
    case advTypes.rent:
      price = price_uah;
      currency = t`${currencies.sum.label.toLowerCase()}/month`;
      break;
    case advTypes.sale:
      price = price_usd;
      currency = currencies.usd.symbol;
      break;
    default:
      price = 0;
      currency = '';
  }
  return { price, currency };
};

export function getRealtyPrice(advType, price, currency){

  switch (advType) {
    case advTypes.rent:
      currency = t`${currencies.sum.label.toLowerCase()}/month`;
      break;
    case advTypes.sale:
      price = price_usd;
      currency = currencies.usd.symbol;
      break;
    default:
      price = 0;
      currency = '';
  }

}
export { formatPrice, getPrice };

export function formatPricePerSquareMeter(value) {
  return formatRCPrice(value) + '/м²';
}

export function formatRCPrice(value, currency = currencies.sum.value) {
  switch (currency) {
    case currencies.sum.value: {
      return `${value.toLocaleString()} руб`;
    }
    case currencies.usd.value: {
      return `${value.toLocaleString()} $`;
    }
    default:
      throw new Error(`${currency} is not a supported currency`);
  }
}

export function formatToCorrectPrice(value) {
  return String(value)
    .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    .trim();
}

export function formatToCurrencyPrice(value, currency = currencies.sum.value) {
  const price = formatToCorrectPrice(value);
  const label = currencies[currency].label.toLowerCase();

  return `${price} ${label}`
}
