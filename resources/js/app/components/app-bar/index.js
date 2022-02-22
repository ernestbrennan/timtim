import React, {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {Trans} from '@lingui/macro';
import Cookies from 'js-cookie';
import {SwipeableDrawer} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import DownloadOurApp from '../common/DownloadOurApp';
import StyledNavLink from '../common/StyledNavLink';
import StyledLink from '../common/StyledLink';
import {TIMTIM_ALREADY_SELECTED_CITY_COOKIE} from '$app/utlis/const';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import useGetUrlForCityId from '$app/hooks/useGetUrlForCityId';
import Routes from '$app/utlis/routes';
import {onAuthLogout, onAuthRequested} from '$app/redux/actions/authActions';
import {
  onCitiesDrawerDisplayChange,
  onCityValueChanged,
  onGeoZoomSelected,
  onMapRealtySelected,
  onShowFavorites,
  onSideMenuDisplayChange,
} from '$app/redux/actions/uiActions';
import {onlineMagazineURL} from '$js/config';
import RoomIcon from '@material-ui/icons/Room';

import LogoIcon from '$app/icons/new/Logo';
import useStyles from './style';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FavoriteBtn from "$app/components/common/favorite-btn";

const Index = (
  {
    isDrawerOpen,
    onCitiesDrawerDisplayChange,
    onCityValueChanged,
    cities,
    currentCityId,
    onSideMenuDisplayChange,
    onAuthRequested,
    isAuthenticated,
    onAuthLogout,
  }
) => {
  const history = useHistory();
  const classes = useStyles();
  const currentCity = cities && currentCityId ? cities.find((c) => c.id === currentCityId) : null;
  const currentCityName = currentCity ? currentCity?.name : 'Киев';
  const getUrlForCityId = useGetUrlForCityId(cities);
  const dispatch = useDispatch();
  const location = useLocation();

  const addElevation = location.pathname === Routes.index;
  const favouritesUrl = useGetFullRoute(Routes.favourites);
  const onShowFavorites = useCallback(() => {
    dispatch(onMapRealtySelected(null));
    dispatch(onGeoZoomSelected(null));
    history.push(favouritesUrl);
  }, [history, dispatch, favouritesUrl]);

  const handleMenuOpen = () => {
    onSideMenuDisplayChange(true);
  };

  return (
    <>
      <AppBar position="sticky" elevation={addElevation ? 0 : 2} className={classes.appBar}>
        {cities && (
          <SwipeableDrawer
            anchor="top"
            open={isDrawerOpen}
            onOpen={() => ({})}
            onClose={() => onCitiesDrawerDisplayChange(false)}
          >
            <div className={classes.cities}>
              {cities.map((city, index) => {
                return (
                  <div
                    key={index}
                    className={classes.cityIcon}
                    onClick={() => {
                      if (currentCityId !== city.id) {
                        history.push(getUrlForCityId(city.id));
                      }
                      Cookies.set(TIMTIM_ALREADY_SELECTED_CITY_COOKIE, city.slug);
                      onCitiesDrawerDisplayChange(false);
                    }}
                  >
                    <img className={classes.cityImg} src={city.icon} alt=""/>
                    <div className={classes.overlay}/>
                    <div className={classes.cityTitle}>{city.name}</div>
                  </div>
                );
              })}
            </div>
          </SwipeableDrawer>
        )}
        <Toolbar position="right" className={classes.toolbar}>
          <StyledLink to={useGetFullRoute(Routes.index)} className={classes.logo}>
            <LogoIcon/>
          </StyledLink>
          <Hidden smDown>
            <StyledNavLink
              to={useGetFullRoute(Routes.rent)}
              className={classes.linkText}
              activeClassName={classes.activeLinkText}
              isActive={(match, location) =>
                location.pathname.includes(Routes.rent) &&
                !location.pathname.includes(`${Routes.rent}/apartment/`)
              }
            >
              <Trans>Rent</Trans>
            </StyledNavLink>
            <StyledNavLink
              to={useGetFullRoute(Routes.sale)}
              className={classes.linkText}
              activeClassName={classes.activeLinkText}

              isActive={(match, location) =>
                location.pathname.includes(Routes.sale) &&
                !location.pathname.includes(`${Routes.sale}/apartment/`)
              }
            >
              <Trans>Sale</Trans>
            </StyledNavLink>
            <StyledNavLink
              to={useGetFullRoute(Routes.complexList)}
              className={classes.linkText}
              activeClassName={classes.activeLinkText}
              isActive={(match, location) =>
                location.pathname.includes(Routes.complesList) ||
                location.pathname.includes('/complex')
              }
            >
              <Trans>New buildings</Trans>
            </StyledNavLink>
            <a href={onlineMagazineURL} className={classes.linkText}>
              <Trans>Magazine</Trans>
            </a>
          </Hidden>
          <div className={classes.titleContainer} onClick={() => onCitiesDrawerDisplayChange(true)}>
            <RoomIcon fontSize={'small'}/>
            <h1 className={classes.title}>
              <span>{currentCityName}</span>
            </h1>
          </div>
          <Hidden mdDown>
            <DownloadOurApp/>
          </Hidden>
          <div className={classes.spacer}/>
          <Hidden xsDown>
            <FavoriteBtn
              className={classes.favoriteBtn}
              isFavorite={true}
              onClick={onShowFavorites}
            />
            <Button
              variant="outlined"
              color="primary"
              className={classes.authBtn}
              onClick={isAuthenticated ? onAuthLogout : onAuthRequested}
              startIcon={<AccountCircleRoundedIcon/>}
            >
              {isAuthenticated ? <Trans>Log out</Trans> : <Trans>Log in</Trans>}
            </Button>
          </Hidden>
          <IconButton
            edge="start"
            color="primary"
            className={classes.menuBtn}
            aria-label="Menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = function ({ui, cities, auth}) {
  return {
    isDrawerOpen: ui.isCitiesDrawerOpen,
    cities: cities.cities,
    currentCityId: cities.currentCityId,
    isAuthenticated: auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  onCitiesDrawerDisplayChange,
  onCityValueChanged,
  onSideMenuDisplayChange,
  onAuthRequested,
  onAuthLogout,
  onShowFavorites,
})(Index);
