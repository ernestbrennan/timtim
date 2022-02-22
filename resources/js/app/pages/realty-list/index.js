import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from "@material-ui/core/Hidden";

import { onMapRealtySelected, setSearchType } from '$app/redux/actions/uiActions';
import { SearchType } from '$app/redux/reducers/search';
import { getRealtyListPageOpened } from '$app/redux/actions/apiActions';
import SearchPanel from './SearchPanel';

import MapViewFC from '$app/components/map/MapViewFC';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  container: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  sideBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      width: 596,
      minWidth: 596,
    },
    backgroundColor: '#F8F9FA',
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

export default React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const advType = useSelector((state) => state.filters.advType);

  useEffect(() => {
    dispatch(onMapRealtySelected(null));
    dispatch(setSearchType(SearchType.realty));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRealtyListPageOpened());
  }, [advType, dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <aside className={classes.sideBar}>
          <SearchPanel />
        </aside>
        <Hidden smDown>
          <div className={classes.mapContainer}>
            <Suspense fallback={<div />}>
              <MapViewFC />
            </Suspense>
          </div>
        </Hidden>
      </div>
    </div>
  );
});
