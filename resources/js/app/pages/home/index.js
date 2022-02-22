import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

import SearchSection from './searchSection';
import CitiesSection from './citiesSection';
import ComplexesSection from './complexesSection';
import AppSection from './appSection';

import Footer from '$app/components/common/footer/Footer';

import AdvantagesSection from './AdvantagesSection';
import PublishSection from './PublishSection';
import PickCityPanel from './PickCityPanel';
import { useGetRouteForSearchType } from './helpers';
import { TIMTIM_ALREADY_SELECTED_CITY_COOKIE } from '$app/utlis/const';
import { onCitiesDrawerDisplayChange } from '$app/redux/actions/uiActions';
import { shuffleArray } from '$app/utlis/common';
import { convertResidentialComplexData } from '$app/utlis/realEstateDevelopers';
import getApi from '$app/api';
import uniqBy from '$app/utlis/uniqBy';
import {getList as getComplexList} from '$app/api/complex'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden scroll',
    paddingTop: '0 16px',
    '-webkit-overflow-scrolling': 'touch',
    [theme.breakpoints.down('md')]: {
      padding: 'unset',
      justifyContent: 'unset',
    },
  },
}));

const getDefaultFilters = (cityId = 1) => ({
  filters: {
    geoParams: [{ filterName: 'city', params: { city: cityId } }],
    flatParams: [
      {
        filterName: 'lines_ranges',
        params: {
          year_max: 3020,
          year_min: 2020,
          quarter_max: 4,
          quarter_min: 1,
        },
      },
    ],
  },
});

const apiClient = getApi();

export default () => {
  const [isLoading, setLoading] = useState(true);
  const [complexes, setComplexes] = useState([]);
  const [searchType, setSearchType] = useState(0);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const currentCityId = useSelector((state) => state.cities.currentCityId);
  const isCitiesDrawerOpen = useSelector((state) => state.ui.isCitiesDrawerOpen);
  const routeForCurrentSearchType = useGetRouteForSearchType(searchType);

  const hasCookie = Boolean(Cookies.get(TIMTIM_ALREADY_SELECTED_CITY_COOKIE));
  const [showCitySelect, setShowCitySelect] = useState(!hasCookie);

  const currentCity = cities && currentCityId ? cities.find((c) => c.id === currentCityId) : null;
  const currentCityName = currentCity ? currentCity?.name : 'Киев';

  const onApplySearch = useCallback(() => {
    history.push(routeForCurrentSearchType);
  }, [history, routeForCurrentSearchType]);

  const onCityChange = useCallback(() => {
    dispatch(onCitiesDrawerDisplayChange(true));
    setShowCitySelect(false);
  }, [dispatch]);

  const onCityConfirm = useCallback(() => {
    setShowCitySelect(false);
    Cookies.set(TIMTIM_ALREADY_SELECTED_CITY_COOKIE, 'tashkent');
  }, []);

  useEffect(() => {
    if (isCitiesDrawerOpen) {
      setShowCitySelect(false);
    }
  }, [isCitiesDrawerOpen]);

  useEffect(async () => {
    if (currentCityId){
      const {results} = await getComplexList({
        city_id: currentCityId,
        per_page: 10
      })
      setComplexes(results.data);
      setLoading(false);
    }
  }, [currentCityId]);

  return (
    <Box className={styles.root}>
      <PickCityPanel
        showCitySelect={showCitySelect}
        hasCookie={hasCookie}
        onCityChange={onCityChange}
        onCityConfirm={onCityConfirm}
      >
      </PickCityPanel>
      <SearchSection
        searchType={searchType}
        setSearchType={setSearchType}
        onApplySearch={onApplySearch}
      />
      {complexes.length > 0 && (
        <ComplexesSection
          complexes={complexes}
          currentCityName={currentCityName}
          isLoading={isLoading}
        />
      )}
      <AppSection complexesLength={complexes.length}/>
      {/*{cities.length > 0 && <CitiesSection cities={cities}/>}*/}
      {/*<InfoFilterSection />*/}
      <AdvantagesSection/>
      {/*<PublishSection/>*/}
      {/*<FooterSection />*/}

      <Footer />
    </Box>
  );

}