import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '$app/utlis/routes';

function useGetFullRoute(route) {
  const { language, cityName } = useParams();
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentCity = useSelector((state) => state.cities.currentCity);

  const translitCurrentCityName = currentCity?.slug_seo?.toLowerCase();
  let metadataPath = '';
  if ([Routes.about, Routes.lendAnApartment, Routes.adv_placement].includes(route)) {
    metadataPath = `/${language || currentLanguage}`;
  } else {
    metadataPath = `/${language || currentLanguage}/${cityName || translitCurrentCityName}`;
  }
  return metadataPath + route;
}

export default useGetFullRoute;
