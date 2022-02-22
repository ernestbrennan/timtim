import React from 'react';
import { useSelector } from 'react-redux';

import BreadcrumbsNavBar from '../common/BreadcrumbsNavBar'
import {
  advTypeToCrumb, districtToCrumb,
  subwayToCrumb,
} from '$app/utlis/breadcrumbs'

function ResidentialComplexPageBreadcrumbs({ complexData, ...props }) {
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentCity = useSelector((state) => state.cities.currentCity);
  const currentCityName = currentCity.slug_seo;

  const breadcrumbsItems = [];
  breadcrumbsItems.push({
    title: currentCity.name,
    path: `/${currentLanguage}/${currentCityName}/`,
  });
  const advTypeCrumb = advTypeToCrumb(
    'complexes',
    breadcrumbsItems[breadcrumbsItems.length - 1].path,
  );
  breadcrumbsItems.push(advTypeCrumb);

  breadcrumbsItems.push({ title: complexData.name, path: '' });

  return <BreadcrumbsNavBar breadcrumbsItems={breadcrumbsItems} style={{ margin: '24px 16px' }} {...props} />;
}

export default ResidentialComplexPageBreadcrumbs;
