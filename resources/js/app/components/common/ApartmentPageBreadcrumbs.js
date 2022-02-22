import React from 'react';
import BreadcrumbsNavBar from './BreadcrumbsNavBar';
import {
  advTypeToCrumb,
  districtToCrumb,
  roomsToCrumb,
  subwayToCrumb,
} from '../../utlis/breadcrumbs';
import { convertAddress } from '../../utlis/flat';
import { useSelector } from 'react-redux';
import { subwayStationsDescriptorSelector } from '../../redux/reducers/subways';

function ApartmentPageBreadcrumbs({ model, ...props }) {
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentCity = useSelector((state) => state.cities.currentCity);
  const subwaysById = useSelector((state) => subwayStationsDescriptorSelector(state));
  const regions = useSelector((state) => state.regions.regions);
  const currentCityName = currentCity.slug_seo;

  const breadcrumbsItems = [];

  breadcrumbsItems.push({
    title: currentCity.name,
    path: `/${currentLanguage}/${currentCityName}/`,
  });

  const advTypeCrumb = advTypeToCrumb(
    model.adv_type,
    breadcrumbsItems[breadcrumbsItems.length - 1].path,
  );
  breadcrumbsItems.push(advTypeCrumb);

  const roomsCrumb = roomsToCrumb(model.room, breadcrumbsItems[breadcrumbsItems.length - 1].path);
  if (roomsCrumb) {
    breadcrumbsItems.push(roomsCrumb);
  }

  const districtCrumb = districtToCrumb(model.district, regions, advTypeCrumb.path);
  if (districtCrumb) {
    breadcrumbsItems.push(districtCrumb);
  } else {
    const subwayCrumb = subwayToCrumb(model.subways_distance, subwaysById, advTypeCrumb.path);
    if (subwayCrumb) {
      breadcrumbsItems.push(subwayCrumb);
    }
  }

  const address = convertAddress(model.street, model.building_no);
  breadcrumbsItems.push({ title: address, path: '' });

  return <BreadcrumbsNavBar breadcrumbsItems={breadcrumbsItems} style={{ margin: '24px 16px' }} />;
}

export default ApartmentPageBreadcrumbs;
