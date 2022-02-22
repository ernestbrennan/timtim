import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FixedSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import withStyles from '@material-ui/core/styles/withStyles';
import {SwipeableDrawer, useMediaQuery, useTheme} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import {Trans} from '@lingui/macro';

import RealtyListItem from '$app/components/realty-list/RealtyListItem';
import NoFavoritesYet from '$app/components/realty-list/NoFavoritesYet';

import ResidentialComplexListing from '$app/components/residentialComplexes/ResidentalComplexListing';
import SmallLayoutListing from '$app/components/residentialComplexes/SmallLayoutListing';
import Loading from '$app/components/common/Loading';
import DeveloperRequestForm from '$app/components/residentialComplexes/DeveloperRequestForm';
import CloseableModal from '$app/components/common/CloseableModal';
import LandlordProfile from '$app/components/landlordProfile/LandlordProfile';
import {MapType} from '$app/components/map/style';
import useIsMobile from '$app/hooks/useIsMobile';
import getApi from '$app/api';
import {createBbox} from '$app/utlis/createBbox';

import {
  getRemoveLayoutFavourite,
  getRemoveRCFavourite,
  removeFromFavorites,
  searchGeoLoaded,
} from '$app/redux/actions/apiActions';
import {
  onGeoZoomSelected,
  onListFlatHighlighted,
  onMapRealtySelected,
} from '$app/redux/actions/uiActions';
import {
  convertRealEstateToGeoJson,
  convertResidentialComplexData,
  displayRequestSentAlert,
} from '$app/utlis/realEstateDevelopers';

import useStyles from './style';

const apiClient = getApi();
const MapLazyView = React.lazy(() => import('$app/components/map/MapViewFC'));

function AdvFavouritesList({advFavourites, onShowLandlordContactInfo}) {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const listRef = useRef();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const {data} = await apiClient.fetchAdvFavorites(advFavourites);
        setLoading(false);
        setItems(data.results);
        const payload = convertRealEstateToGeoJson(data.results);
        payload.bbox = createBbox(payload.geojson.features);
        dispatch(searchGeoLoaded(payload));
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    }

    if (advFavourites.size > 0) {
      loadData();
    }

    return () => {
      dispatch(onGeoZoomSelected(null));
    };
  }, [dispatch, advFavourites, setItems, setLoading]);

  const handleListFlatHighlighted = useCallback(
    (id) => dispatch(onListFlatHighlighted(id)),
    [dispatch],
  );

  const handleListFlatGeoZoomSelected = useCallback(
    (id) => dispatch(onGeoZoomSelected(id)),
    [dispatch],
  );

  const handleRemoveFromFavorites = useCallback(
    (id) => dispatch(removeFromFavorites(id)),
    [dispatch],
  );

  const DataProviderWrapper = useCallback(
    ({index, style}) => {
      return (
        <RealtyListItem
          data={{
            items,
            favorites: advFavourites,
            onLandlordProfileSelected: onShowLandlordContactInfo,
            onHighlight: handleListFlatHighlighted,
            onGeoZoomSelected: handleListFlatGeoZoomSelected,
            onRemoveFromFavorites: handleRemoveFromFavorites,
          }}
          index={index}
          style={style}
        />
      );
    },
    [
      items,
      advFavourites,
      handleListFlatGeoZoomSelected,
      handleListFlatHighlighted,
      handleRemoveFromFavorites,
      onShowLandlordContactInfo,
    ],
  );

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'} overflow={'auto hidden'}>
      {(() => {
        if ((advFavourites.size === 0 || items.length === 0) && !isLoading) {
          // TODO: handle removed adv properly
          return <NoFavoritesYet/>;
        }
        if (items.length === 0) {
          return <Loading/>;
        }
        return (
          <AutoSizer>
            {({height, width}) => (
              <FixedSizeList
                className="List"
                height={height}
                width={width}
                itemSize={isMobile ? 410 : 212}
                itemCount={items.length}
                ref={listRef}
              >
                {DataProviderWrapper}
              </FixedSizeList>
            )}
          </AutoSizer>
        );
      })()}
    </Box>
  );
}

function RCFavouritesList({RCFavourites}) {
  const [items, setItems] = useState([]);
  const listRef = useRef();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (RCFavourites.size > 0) {
      apiClient.fetchRCFavorites(RCFavourites).then((response) => {
        setItems(response.data.results.map(convertResidentialComplexData));
        const payload = convertRealEstateToGeoJson(response.data.results);
        payload.bbox = createBbox(payload.geojson.features);
        dispatch(searchGeoLoaded(payload));
      });
    } else {
      setItems([]);
      dispatch(searchGeoLoaded(convertRealEstateToGeoJson([])));
    }

    return () => {
      dispatch(onGeoZoomSelected(null));
    };
  }, [dispatch, RCFavourites]);

  const handleListFlatHighlighted = useCallback(
    (hash) => dispatch(onListFlatHighlighted(hash)),
    [dispatch],
  );

  const handleListFlatGeoZoomSelected = useCallback(
    (id) => dispatch(onGeoZoomSelected(id)),
    [dispatch],
  );

  const handleRemoveFromFavorites = useCallback(
    (id) => dispatch(getRemoveRCFavourite(id)),
    [dispatch],
  );

  const DataProviderWrapper = useCallback(
    ({index, style}) => {
      return (
        <ResidentialComplexListing
          residentialComplex={items[index]}
          isFavorite={true}
          onHover={handleListFlatHighlighted}
          onGeoZoomSelected={handleListFlatGeoZoomSelected}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          style={style}
        />
      );
    },
    [items, handleListFlatHighlighted, handleListFlatGeoZoomSelected, handleRemoveFromFavorites],
  );

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'} overflow={'auto hidden'}>
      {(() => {
        if (RCFavourites.size === 0) {
          return <NoFavoritesYet/>;
        }
        if (items.length === 0) {
          return <Loading/>;
        }
        return (
          <AutoSizer>
            {({height, width}) => (
              <FixedSizeList
                className="List"
                height={height}
                width={width}
                itemCount={items.length}
                itemSize={isMobile ? 449 : 207}
                ref={listRef}
              >
                {DataProviderWrapper}
              </FixedSizeList>
            )}
          </AutoSizer>
        );
      })()}
    </Box>
  );
}

function LayoutsFavouritesList({layoutsFavourites, onClarifyClick}) {
  const dispatch = useDispatch();
  const [layouts, setLayouts] = useState([]);
  const listRef = useRef();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (layoutsFavourites.size > 0) {
      apiClient.fetchLayoutsFavorites(layoutsFavourites).then((response) => {
        setLayouts(response.data.results);
        const RCFromFavourites = Array.from(
          new Set(response.data.results.map((layout) => layout.complex_id)),
        );
        apiClient.fetchRCFavorites(RCFromFavourites).then((response) => {
          const payload = convertRealEstateToGeoJson(response.data.results);
          payload.bbox = createBbox(payload.geojson.features);
          dispatch(searchGeoLoaded(payload));
        });
      });
    } else {
      setLayouts([]);
      dispatch(searchGeoLoaded(convertRealEstateToGeoJson([])));
    }

    return () => {
      dispatch(onGeoZoomSelected(null));
    };
  }, [dispatch, layoutsFavourites]);

  const handleListFlatHighlighted = useCallback(
    (id) => dispatch(onListFlatHighlighted(id)),
    [dispatch],
  );

  const handleRemoveLayoutFromFavorites = useCallback(
    (id) => dispatch(getRemoveLayoutFavourite(id)),
    [dispatch],
  );

  const handleGeoZoomSelected = useCallback(
    (id) => dispatch(onGeoZoomSelected(id)),
    [dispatch],
  );

  const DataProviderWrapper = useCallback(
    ({index, style}) => {
      return (
        <SmallLayoutListing
          layout={layouts[index]}
          isFavourite={true}
          onClarifyClick={onClarifyClick}
          onHover={handleListFlatHighlighted}
          onRemoveFromFavorites={handleRemoveLayoutFromFavorites}
          onGeoZoomSelected={handleGeoZoomSelected}
          style={style}
        />
      );
    },
    [
      layouts,
      onClarifyClick,
      handleListFlatHighlighted,
      handleRemoveLayoutFromFavorites,
      handleGeoZoomSelected,
    ],
  );

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'} overflow={'auto hidden'}>
      {(() => {
        if (layoutsFavourites.size === 0) {
          return <NoFavoritesYet/>;
        }
        if (layouts.length === 0) {
          return <Loading/>;
        }
        return (
          <AutoSizer>
            {({height, width}) => (
              <FixedSizeList
                className="List"
                height={height}
                width={width}
                itemCount={layouts.length}
                itemSize={isMobile ? 449 : 202}
                ref={listRef}
              >
                {DataProviderWrapper}
              </FixedSizeList>
            )}
          </AutoSizer>
        );
      })()}
    </Box>
  );
}

function getFavouritesSwitchInteraction(interactionNum) {
  return {
    0: 'rent',
    1: 'sale',
    2: 'complex',
  }[interactionNum];
}


export default () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState();
  const [favouriteType, setFavouriteType] = useState(0);
  const [showRealtyAdvertiserModal, setShowFlatLandlordsModal] = useState(false);
  const [selectedFlatsLandlords, setSelectedFlatsLandlords] = useState(undefined);
  const [alreadySwitchedFavourites, setAlreadySwitchedFavourites] = useState(false);
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    favorites: advFavourites,
    RCFavorites: RCFavourites,
    layoutsFavorites: layoutsFavourites,
  } = useSelector((state) => state.search);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {name: cityName} = useSelector((state) => state.cities.currentCity);

  const handleShowForm = useCallback(() => setShowForm(true), [setShowForm]);
  const handleHideForm = useCallback(() => setShowForm(false), [setShowForm]);

  const handleShowFlatLandlordsModal = useCallback(
    () => setShowFlatLandlordsModal(true),
    [setShowFlatLandlordsModal],
  );
  const handleHideFlatLandlordsModal = useCallback(
    () => setShowFlatLandlordsModal(false),
    [setShowFlatLandlordsModal],
  );

  const onClarifyClick = useCallback((layout) => {
      setSelectedLayout(layout);
      handleShowForm();
    },
    [setSelectedLayout, handleShowForm],
  );

  const onRequestSubmit = useCallback((data) => {
      apiClient.createDeveloperRequest(selectedLayout.complex_id, data).then(() => {
        displayRequestSentAlert();
      });
      handleHideForm();
      setSelectedLayout(undefined);
    },
    [selectedLayout, setSelectedLayout, handleHideForm],
  );

  // eslint-disable-next-line
  const onMapPinInfoClose = useCallback(() => {
    dispatch(onMapRealtySelected(null));
  }, [dispatch]);

  const onShowLandlordContactInfo = useCallback(({landlords}) => {
      setSelectedFlatsLandlords(landlords);
      handleShowFlatLandlordsModal();
    },
    [setSelectedFlatsLandlords, handleShowFlatLandlordsModal],
  );

  const handleTabChange = useCallback((event, value) => {
      setFavouriteType(value);
    },
    [setFavouriteType],
  );

  useEffect(() => {
    dispatch(searchGeoLoaded({}));
  }, [dispatch]);

  useEffect(() => {
    if (!alreadySwitchedFavourites) {
      if (advFavourites.size === 0 && RCFavourites.size !== 0) {
        setFavouriteType(1);
        setAlreadySwitchedFavourites(true);
      } else {
        if (advFavourites.size === 0 && RCFavourites.size === 0 && layoutsFavourites.size !== 0) {
          setFavouriteType(2);
          setAlreadySwitchedFavourites(true);
        }
      }
    }
  }, [advFavourites, RCFavourites, layoutsFavourites, alreadySwitchedFavourites]);

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3><Trans>Favourites</Trans></h3>
          <Tabs
            className={styles.sidebarTabs}
            value={favouriteType}
            onChange={handleTabChange}
          >
            <Tab
              className={styles.sidebarTabs}
              label={<Trans>Ads {advFavourites.size > 0 ? `(${advFavourites.size})` : ''}</Trans>}
            />
            <Tab
              className={styles.sidebarTabs}
              label={<Trans>New buildings {RCFavourites.size > 0 ? `(${RCFavourites.size})` : ''}</Trans>}
            />
            <Tab
              className={styles.sidebarTabs}
              label={
                <Trans>
                  Layouts {layoutsFavourites.size > 0 ? `(${layoutsFavourites.size})` : ''}
                </Trans>
              }
            />
          </Tabs>
        </div>
        {favouriteType === 0 && (
          <AdvFavouritesList
            advFavourites={advFavourites}
            onShowLandlordContactInfo={onShowLandlordContactInfo}
          />
        )}
        {favouriteType === 1 && <RCFavouritesList RCFavourites={RCFavourites}/>}
        {favouriteType === 2 && (
          <LayoutsFavouritesList
            layoutsFavourites={layoutsFavourites}
            onClarifyClick={onClarifyClick}
          />
        )}
      </div>
      <Hidden smDown>
        <div className={styles.mapContainer}>
          <Suspense fallback={<div/>}>
            <MapLazyView type={favouriteType === 0 ? MapType.realtyList : MapType.complexList}/>
          </Suspense>
        </div>
      </Hidden>
      <section id={'modals'}>
        <CloseableModal isOpen={showForm}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <DeveloperRequestForm
              type={'layout'}
              object={selectedLayout}
              onSubmit={onRequestSubmit}
              onClose={handleHideForm}
            />
          </Box>
        </CloseableModal>
        {isMobile ? (
          <SwipeableDrawer
            anchor="bottom"
            open={showRealtyAdvertiserModal}
            onOpen={() => ({})}
            onClose={handleHideFlatLandlordsModal}
          >
            <LandlordProfile landlords={selectedFlatsLandlords}/>
          </SwipeableDrawer>
        ) : (
          <Modal
            aria-labelledby="landlord modal"
            aria-describedby="landlord contact information"
            open={showRealtyAdvertiserModal}
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
              },
            }}
            onClose={handleHideFlatLandlordsModal}
          >
            <LandlordProfile landlords={selectedFlatsLandlords}/>
          </Modal>
        )}
      </section>
    </div>
  );
}