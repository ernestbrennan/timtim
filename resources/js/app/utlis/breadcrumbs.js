import { t } from '@lingui/macro';
import { getRegionIdFromTokenValue } from './seoUrlParser';
import { findNearestSubway } from './flat';

export const advTypeToCrumb = (value, baseUrl = '/uk/kyiv/') => {
  switch (value) {
    case 'sale':
      return {
        title: t`Sale`,
        path: baseUrl + 'sale/',
      };
    case 'rent':
      return {
        title: t`Rent`,
        path: baseUrl + 'rent/',
      };
    case 'complexes':
    case 'complex':
      return {
        title: t`New buildings`,
        path: baseUrl + 'complex/',
      };
    default:
      return null;
  }
};

export const districtToCrumb = (value, regions, baseUrl = '/uk/kyiv/') => {
  if (!value) {
    return null;
  }
  const district = getRegionIdFromTokenValue(value, regions);
  return district ? { title: value, path: `${baseUrl}${district?.slug_seo}/` } : null;
};

export const subwayToCrumb = (subways, subwaysById, baseUrl = '/uk/kyiv/') => {
  if (!subways) {
    return null;
  }
  const nearestSubway = findNearestSubway(subways, subwaysById);
  const subwayLatin = nearestSubway?.slug_seo;

  return nearestSubway
    ? {
        title: t`station ${nearestSubway?.name}`,
        path: `${baseUrl}metro-${subwayLatin}/`,
      }
    : null;
};

export const roomsToCrumb = (value, baseUrl = '/uk/kyiv/') => {
  switch (value) {
    case 1:
      return {
        title: t`1-room`,
        path: baseUrl + 'odnokomnatnaia-kvartira/',
      };
    case 2:
      return {
        title: t`2-rooms`,
        path: baseUrl + 'dvukhkomnatnaia-kvartira/',
      };
    case 3:
      return {
        title: t`3-rooms`,
        path: baseUrl + 'trekhkomnatnaia-kvartira/',
      };
    case 4:
      return {
        title: t`4-rooms`,
        path: baseUrl + 'chetyrekhkomnatnaia-kvartira/',
      };
    default:
      return null;
  }
};
