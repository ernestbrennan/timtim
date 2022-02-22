import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Trans } from '@lingui/macro';

import Loader from '../common/Loader';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import useIsMobile from '$app/hooks/useIsMobile';
import { getAddRCFavourite, getRemoveRCFavourite } from '$app/redux/actions/apiActions';
import {getResetFilters} from '$app/redux/actions/uiActions';
import Routes from '$app/utlis/routes';
import ComplexListItem from "$app/components/complex-list/ComplexListItem";

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#636363',
    fontSize: 18,
    fontWeight: 600,
    marginRight: 60
},
  listWrapper: {
    maxHeight: '435px',
    overflowY: 'hidden',
  },
  buttonArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    border: 0,
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',
    '& + &': {
      marginLeft: 16,
    },
  },
  buttonMore: {
    color: theme.palette.primary.main,
    fontSize: 12,
    display: 'block',
    textAlign: 'center',
    padding: 0,
    '&:hover': {
      background: 'none'
    },
    '& svg': {
      fontSize: 18,
    },
  },
}));

const cardWidthDesktop = 352;
const cardWidthMobile = 330;
const cardMarginRight = 32;

function VerifiedNewBuildings({ complexes, currentCityName, isLoading }) {
  const classes = useStyles();
  const itemContainerRef = useRef();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.search.RCFavorites);
  const isMobile = useIsMobile();

  const rcListUrl = useGetFullRoute(Routes.complexList);

  const onAddToFavorites = useCallback((id) => dispatch(getAddRCFavourite(id)), [dispatch]);
  const onRemoveFromFavorites = useCallback((id) => dispatch(getRemoveRCFavourite(id)), [dispatch]);

  const onClickLeft = useCallback(() => {
    if (itemContainerRef.current.scrollLeft <= 0) {
      itemContainerRef.current.scrollBy({
        left: cardWidthDesktop * complexes.length,
        behavior: 'smooth',
      });
    }

    itemContainerRef.current.scrollBy({
      left: isMobile ? -362 : -(cardWidthDesktop * 3 + cardMarginRight * 3),
      behavior: 'smooth',
    });
  }, [complexes.length, isMobile]);

  const onClickRight = useCallback(() => {
    if (cardWidthDesktop * (complexes.length - 3) <= itemContainerRef.current.scrollLeft) {
      itemContainerRef.current.scrollBy({
        left: -(cardWidthDesktop * complexes.length),
        behavior: 'smooth',
      });
    }

    itemContainerRef.current.scrollBy({
      left: isMobile ? 362 : cardWidthDesktop * 3 + cardMarginRight * 3,
      behavior: 'smooth',
    });
  }, [complexes.length, isMobile]);

  const handleResetFilters = useCallback(() => {
    dispatch(getResetFilters());
  }, [dispatch]);

  return (
    <Box width={'100%'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={5}>
        <Box
          display={'flex'}
          alignItems={isMobile ? undefined : 'center'}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <span className={classes.title}>
            <Trans>
              Verified{' '}
              <Hidden smUp>
                <br />
              </Hidden>
              new buildings
            </Trans>
          </span>

          <Button
            component={Link}
            to={rcListUrl}
            className={classes.buttonMore}
            onClick={handleResetFilters}
          >
            <Trans>View all</Trans> <KeyboardArrowRight />
          </Button>

        </Box>
        {complexes.length > 3 && (
          <Box display={'flex'}>
            <button className={classes.buttonArrow} onClick={onClickLeft}>
              <KeyboardArrowLeft color="action" />
            </button>
            <button className={classes.buttonArrow} onClick={onClickRight}>
              <KeyboardArrowRight color="action" />
            </button>
          </Box>
        )}
      </Box>
      {isLoading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
          width={'100%'}
        >
          <Loader />
        </Box>
      ) : (
        <Box className={classes.listWrapper}>
          <Box overflow={'auto hidden'} display={'flex'} width={'100%'} ref={itemContainerRef}>
            {complexes.map((complex) => (
              <Box mr={4} key={complex.id}>
                <ComplexListItem
                  forceVertical
                  complex={complex}
                  isFavorite={favourites.has(String(complex.id)) || favourites.has(complex.id)}
                  onHighlight={() => {}}
                  onGeoZoomSelected={() => {}}
                  onAddToFavorites={onAddToFavorites}
                  onRemoveFromFavorites={onRemoveFromFavorites}
                  style={{
                    height: 435,
                    width: isMobile ? cardWidthMobile : cardWidthDesktop,
                    border: '1px solid #DFE1E5',
                    borderRadius: 8,
                  }}
                >
                </ComplexListItem>
              </Box>
            ))}
          </Box>
        </Box>
      )}

    </Box>
  );
}

export default VerifiedNewBuildings;
