import React, {Suspense, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {onGeoZoomSelected, onMapRealtySelected, setSearchType} from '$app/redux/actions/uiActions';
import {getComplexListPageOpened} from '$app/redux/actions/apiActions'
import {SearchType} from '$app/redux/reducers/search';
import MapViewFC from '$app/components/map/MapViewFC';
import Hidden from "@material-ui/core/Hidden";
import SearchPanel from "$app/pages/complex-list/SearchPanel";
import {MapType} from '$app/components/map/style.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
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

  useEffect(() => {
    dispatch(setSearchType(SearchType.complex));
    dispatch(onMapRealtySelected(null));
    dispatch(onGeoZoomSelected(null));

    dispatch(getComplexListPageOpened())
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <aside className={classes.sideBar}>
          <SearchPanel/>
        </aside>
        <Hidden smDown>
          <div className={classes.mapContainer}>
            <Suspense fallback={<div/>}>
              <MapViewFC type={MapType.complexList}/>
            </Suspense>
          </div>
        </Hidden>
      </div>
    </div>
  );
});
