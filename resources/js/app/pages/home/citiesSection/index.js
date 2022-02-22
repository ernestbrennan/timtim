import React, {useCallback, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Trans, Plural} from '@lingui/macro';
import Cookies from 'js-cookie';

import StyledButton from '$app/components/common/StyledButton';
import Text, {TextWeight} from '$app/components/common/Text';
import useGetUrlForCityId from '$app/hooks/useGetUrlForCityId';
import useIsMobile from '$app/hooks/useIsMobile';
import {TIMTIM_ALREADY_SELECTED_CITY_COOKIE} from '$app/utlis/const';

import useStyles from './style'

function CitiesSection({cities}) {
  const [slicer, setSlicer] = useState(9);
  const classes = useStyles();
  const isMobile = useIsMobile();
  const getUrlForCityId = useGetUrlForCityId(cities);

  const handleChangeCity = useCallback((slug) => Cookies.set(TIMTIM_ALREADY_SELECTED_CITY_COOKIE, slug),
    [],
  );

  const handleSetSlicer = useCallback(() => setSlicer(cities.length), [cities.length]);

  const renderButtons = useMemo(() => {
    return isMobile
      ? cities
        .map((city) => (
          <StyledButton
            key={city.id}
            component={Link}
            to={getUrlForCityId(city.id)}
            className={classes.button}
            onClick={() => handleChangeCity(city)}
          >
            <Text weight={TextWeight.semiLight}>{city.name}</Text>
          </StyledButton>
        ))
        .slice(0, slicer)
      : cities
        .map((city) => (
          <StyledButton
            key={city.id}
            component={Link}
            to={getUrlForCityId(city.id)}
            className={classes.button}
            onClick={() => handleChangeCity(city.slug_seo)}
          >
            <Text weight={TextWeight.semiLight}>{city.name}</Text>
          </StyledButton>
        ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, cities, slicer, getUrlForCityId, handleChangeCity]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Text size={26} weight={TextWeight.heavy}>
          <Trans>TimTim in cities</Trans>
        </Text>
        <div className={classes.list}>
          {renderButtons}
          {isMobile && slicer < cities.length && (
            <StyledButton className={classes.button} onClick={handleSetSlicer}>
              <Text weight={TextWeight.heavy}>
                <Plural value={cities.length} few="All # cities" other="All # cities"/>
              </Text>
            </StyledButton>
          )}
        </div>
      </div>
      <div className={classes.divider}/>
    </div>
  );
}

export default CitiesSection;
