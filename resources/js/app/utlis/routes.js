import { SupportedLanguageCodes } from './localization';

const Routes = {
  about: '/about-us/',
  lendAnApartment: '/lend_an_appartment/',
  complexList: '/complex/',
  index: '/',
  rent: '/rent/',
  sale: '/sale/',
  favourites: '/favourites/',
  adv_placement: '/reklama/',
  residentialComplex(id, openRequestForm) {
    if (openRequestForm) {
      return `/residential-complex/${id}/?openRequestForm=${openRequestForm}`;
    }
    return `/residential-complex/${id}/`;
  },
  residentialComplexLayouts(id) {
    return `${this.residentialComplex(id)}layouts/`;
  },
  apartmentPage(advType, id, subpage = undefined) {
    return `/${advType}/apartment/${id}/` + (subpage ? `${subpage}/` : '');
  },
  realtyPage(advType, id, subpage = undefined) {
    return `/${advType}/realty/${id}/` + (subpage ? `${subpage}/` : '');
  },
  complexPage(id, subpage = undefined) {
    return `/complex/${id}/` + (subpage ? `${subpage}/` : '');
  },
};

export function getRedirectForIncompleteLink(pathParts) {
  const parsedParts = pathParts.map((item) => {
    if (Object.values(SupportedLanguageCodes).includes(item)) {
      return { type: 'language', value: item };
    }
    if (item.match(/[a-zA-Z]{3,}/)) {
      return { type: 'city', value: item };
    }
    return { type: 'trash', value: item };
  });
  const languageToken = parsedParts.find((item) => item.type === 'language');
  const cityToken = parsedParts.find((item) => item.type === 'city');
  if (!languageToken && !cityToken) {
    return '/run/tashkent/';
  }
  if (parsedParts.some((item) => item.type === 'trash')) {
    return;
  }
  if (languageToken) {
    return `/${languageToken}/tashkent/`;
  }
  if (cityToken) {
    return `/ru/${cityToken}`;
  }
}

export default Routes;
