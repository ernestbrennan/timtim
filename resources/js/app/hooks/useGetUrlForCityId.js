import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function getUrlForCityId(id, cities, location, currentCitySeoSlug) {
  const desiredCity = cities.find((city) => city.id === id);
  if (!desiredCity) {
    throw new Error(`Can't find city with id ${id}`);
  }
  return location.pathname
    .replace(currentCitySeoSlug, desiredCity.slug)
    .replace(/\/(\d)\//, `/${desiredCity.slug}/`) // fixes cases with old (numerical city id) city cookies
    .replace('/undefined/', `/${desiredCity.slug}/`); // covers cases with cities not being loaded in time
}

function useGetUrlForCityId(cities) {
  const location = useLocation();
  const currentCitySeoSlug = useSelector((state) => state.cities.currentCity?.slug);

  return (id) => getUrlForCityId(id, cities, location, currentCitySeoSlug);
}

export default useGetUrlForCityId;
