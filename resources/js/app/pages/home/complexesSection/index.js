import React, {useCallback, useRef} from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';

import useStyles from './style';
import {useDispatch, useSelector} from "react-redux";
import useIsMobile from "$app/hooks/useIsMobile";
import useGetFullRoute from "$app/hooks/useGetFullRoute";
import Routes from "$app/utlis/routes";
import {getAddRCFavourite, getRemoveRCFavourite} from "$app/redux/actions/apiActions";
import {getResetFilters} from "$app/redux/actions/uiActions";
import {Trans} from "@lingui/macro";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Loader from "$app/components/common/Loader";
import ComplexListItem from "$app/components/complex-list/ComplexListItem";

const cardWidthDesktop = 352;
const cardWidthMobile = 330;
const cardMarginRight = 32;

function ComplexesSection({ complexes, currentCityName, isLoading }) {
  const classes = useStyles();

  const itemContainerRef = useRef();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.search.RCFavorites);
  const isMobile = useIsMobile();

  const complexListUrl = useGetFullRoute(Routes.complexList);

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
    <Box className={classNames(classes.newBuildings, classes.padding)}>
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
              to={complexListUrl}
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
    </Box>
  );
}

export default ComplexesSection;
