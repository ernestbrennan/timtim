import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { t } from '@lingui/macro';
import BreadcrumbsNavBar from './BreadcrumbsNavBar';

import { parseLandingPageTokens } from '$app/utlis/seoUrlParser';
import { TokenTypes } from '$app/redux/const/const';
import { advTypeToCrumb, roomsToCrumb } from '$app/utlis/breadcrumbs';

function AdvListBreadcrumbs() {
  const location = useLocation();
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentCity = useSelector((state) => state.cities.currentCity);
  const currentCityName = currentCity.slug_seo;
  const breadcrumbsItems = [];
  const tokens = location.pathname.match(/\/((\w|[-_])+)/g);
  const parsedTokens = parseLandingPageTokens(tokens);

  breadcrumbsItems.push({
    title: currentCity.name,
    path: `/${currentLanguage}/${currentCityName}/`,
  });
  const advType = parsedTokens.find((token) => token.type === TokenTypes.advType)?.value;
  const advTypeCrumb = advTypeToCrumb(advType, breadcrumbsItems[breadcrumbsItems.length - 1]?.path);
  breadcrumbsItems.push(advTypeCrumb);
  const roomsNumber = parsedTokens.find((token) => token.type === TokenTypes.roomsNumber)?.value;
  const roomsCrumb = roomsToCrumb(roomsNumber, breadcrumbsItems[breadcrumbsItems.length - 1]?.path);
  if (roomsCrumb) {
    breadcrumbsItems.push(roomsCrumb);
  }
  const districtSlug = parsedTokens.find((token) => token.type === TokenTypes.districtName)?.value;
  const district = regions.find((item) => item.slug_seo === `${districtSlug}-raion`);
  if (district) {
    breadcrumbsItems.push({
      title: t`${district?.name} district`,
      path: `${breadcrumbsItems[breadcrumbsItems.length - 1].path}/${district.slug_seo}/`,
    });
  } else {
    const subwaySlug = parsedTokens.find((token) => token.type === TokenTypes.subwayName)?.value;
    const subway = subways.find((item) => item.slug_seo === subwaySlug);
    if (subway) {
      breadcrumbsItems.push({
        title: t`station ${subway?.name}`,
        path: `${breadcrumbsItems[breadcrumbsItems.length - 1].path}/metro-${subway.slug_seo}/`,
      });
    }
  }
  return <BreadcrumbsNavBar breadcrumbsItems={breadcrumbsItems} style={{ margin: '24px 16px' }} />;
}

export default AdvListBreadcrumbs;
