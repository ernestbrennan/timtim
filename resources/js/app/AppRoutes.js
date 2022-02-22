import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import Cookies from 'js-cookie';

import HomePage from '$app/pages/home';
import RealtyListPage from '$app/pages/realty-list';
import RealtyPage from '$app/pages/realty';
import ComplexListPage from '$app/pages/complex-list';
import ComplexPage from '$app/pages/complex';
// import ComplexPage from '$app/pages/residential-complex';
import FavouritesPage from '$app/pages/favourites';

import NotFoundPage from '$app/pages/NotFoundPage';

// import ResidentialComplexLayoutsPage from '$app/pages/residential-complex-layouts';
// import ResidentialComplexPage from '$app/pages/residential-complex';
//
// import AdvPlacementPage from '$app/pages/adv-placement';
import AboutUsPage from '$app/pages/about-us';


import { getSetLanguage, onCityValueChanged, onMainPageOpen } from '$app/redux/actions/uiActions';
import Routes from '$app/utlis/routes';
import {isSupportedLanguage} from '$app/utlis/localization'
import { getCityIdFromTokenValue } from '$app/utlis/seoUrlParser';
import {
  TIMTIM_ALREADY_SELECTED_CITY_COOKIE,
  TIMTIM_ALREADY_SELECTED_LANGUAGE_COOKIE,
} from '$app/utlis/const';

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactPixel.pageView();
  }, [location]);
}

const defaultCitySlug = 'tashkent';

export function MetaRoutes({ children }) {
  const location = useLocation();

  return (
    <Switch>
      <Route
        path="/:url*"
        exact
        strict
        render={() => {
          return <Redirect to={`${location.pathname}/`} />;
        }}
      />
      <Route path="/:language/:cityName/*">{children}</Route>
      <Route
        render={() => {
          if (location.pathname === '/') {
            const presetLanguageCode = Cookies.get(TIMTIM_ALREADY_SELECTED_LANGUAGE_COOKIE);
            const presetCitySlug = Cookies.get(TIMTIM_ALREADY_SELECTED_CITY_COOKIE);

            const languageToRedirectTo = presetLanguageCode || 'ru';
            const cityToRedirectTo = presetCitySlug || defaultCitySlug;

            return <Redirect to={`/${languageToRedirectTo}/${cityToRedirectTo}/`} />;
          }
          return <NotFoundPage />;
        }}
      />
    </Switch>
  );
}

export function AppRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentCity = useSelector((state) => state.cities.currentCity);
  const currentCityId = useSelector((state) => state.cities.currentCityId);
  const currentLanguage = useSelector((state) => state.ui.language);
  const cities = useSelector((state) => state.cities.cities);
  const citiesSlug = cities.map((city) => city.slug);
  const { language, cityName } = useParams();
  const metaPath = `/${language}/${cityName}`;
  const history = useHistory();

  usePageViews();

  useEffect(() => {
    if (language && isSupportedLanguage(language) && currentLanguage !== language) {
      dispatch(getSetLanguage(language));
    }
    if (
      cityName &&
      cities.length > 0 &&
      (currentCityId === null || currentCity?.slug !== cityName)
    ) {
      const newCityId = getCityIdFromTokenValue(cityName, cities);
      newCityId && dispatch(onCityValueChanged(newCityId));
    }
  }, [
    dispatch,
    currentCity,
    currentCityId,
    location.pathname,
    history,
    language,
    cityName,
    cities,
    currentLanguage,
  ]);

  useEffect(() => {
    dispatch(onMainPageOpen());
  }, [dispatch, currentCityId]);

  if (language && !isSupportedLanguage(language)) {
    return <NotFoundPage />;
  }

  if (![Routes.about, Routes.lendAnApartment, Routes.adv_placement].includes(`/${cityName}/`)) {
    if (citiesSlug.length > 0 && !citiesSlug.includes(cityName)) {
      const presetCitySlug = Cookies.get(TIMTIM_ALREADY_SELECTED_CITY_COOKIE);
      const cityToRedirectTo = presetCitySlug || defaultCitySlug;
      const redirectUrl = location.pathname.replace(cityName, cityToRedirectTo);
      return <Redirect to={redirectUrl} />;
    }
  }1

  return (
    //TODO: rewrite trailing slashes handling to do all handling in one place
    <>
      <Switch>
        <Route
          path={`${metaPath}/residential-complex-list/`}
          render={() => {
            return <Redirect to={`${metaPath}${Routes.complexList}`} />;
          }}
        />
        <Route path={`/${language}${Routes.about}`} exact strict>
          <AboutUsPage />
        </Route>
        {/*<Route path={`/${language}${Routes.adv_placement}`} exact strict>*/}
        {/*  <AdvPlacementPage />*/}
        {/*</Route>*/}
        <Route path={`${metaPath}${Routes.favourites}`} exact strict>
          <FavouritesPage />
        </Route>
        <Route path={`${metaPath}/rent/realty/:id/:subpage?/`} exact strict>
          <RealtyPage />
        </Route>
        <Route path={`${metaPath}/sale/realty/:id/:subpage?/`} exact strict>
          <RealtyPage />
        </Route>
        <Route path={`${metaPath}${Routes.complexList}`} exact strict>
          <ComplexListPage />
        </Route>
        <Route path={`${metaPath}/complex/:id/:subpage?/`} exact strict>
          <ComplexPage />
        </Route>
        {/*<Route path={`${metaPath}${Routes.residentialComplexLayouts(':complexId')}`} exact strict>*/}
        {/*  <ResidentialComplexLayoutsPage />*/}
        {/*</Route>*/}
        <Route path={`${metaPath}${Routes.rent}`} exact strict>
          <RealtyListPage />
        </Route>
        <Route path={`${metaPath}${Routes.sale}`} exact strict>
          <RealtyListPage />
        </Route>
        <Route
          path={`${metaPath}${Routes.index}`}
          render={() => {
            if (location.pathname === metaPath + '/') {
              return <HomePage />;
            }
            const urlWithOneTrailingSlash = location.pathname.replace(/(\/{2,})/, '/'); //replace two or more '/' with one '/'
            if (Object.values(Routes).includes(urlWithOneTrailingSlash)) {
              return <Redirect to={urlWithOneTrailingSlash} />;
            }
            return <NotFoundPage />;
          }}
        />
      </Switch>
    </>
  );
}
