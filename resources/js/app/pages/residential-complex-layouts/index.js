import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga';
import { Trans } from '@lingui/macro';
import { last, take } from 'ramda';

import Footer from '$app/components/common/footer/Footer';
import ComplexInfoForLayoutPage from '$app/components/residentialComplexes/ComplexInfoForLayoutPage';
import LayoutListing from '$app/components/residentialComplexes/LayoutListing';
import DeveloperRequestForm from '$app/components/residentialComplexes/DeveloperRequestForm';
import CloseableModal from '$app/components/common/CloseableModal';
import ChipCheckbox from '$app/components/common/chipCheckbox/ChipCheckbox';
import LayoutsPagination from '$app/components/residentialComplexes/LayoutsPagination';
import NoSearchResults from '$app/components/flat-list/NoSearchResults';
import FindHousingEasyBanner from '$app/components/residentialComplexes/FindHousingEasyBanner';
import RCContactPhonePanel from '$app/components/residentialComplexes/RCContactPhonePanel';
import RCCallbackForm from '$app/components/residentialComplexes/RCCallbackForm';
import AdvPageLoader from '$app/components/common/AdvPageLoader';

import { selectFilters as convertFiltersToAPIFormat } from '$app/redux/selectors/selectors';
import { onDueDateChange, onRoomFilterValuesChanged } from '$app/redux/actions/uiActions';
import { subwayStationsDescriptorSelector } from '$app/redux/reducers/subways';
import { FILTERS } from '$app/redux/const/filters';
import {
  getAddLayoutFavourite,
  getRemoveLayoutFavourite,
  loadSubways,
} from '$app/redux/actions/apiActions';

import Routes from '$app/utlis/routes';
import {
  adaptFiltersToLayouts,
  convertResidentialComplexData,
  displayRequestSentAlert,
} from '$app/utlis/realEstateDevelopers';
import useIsMobile from '$app/hooks/useIsMobile';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import MoreFiltersIcon from '$app/icons/MoreFiltersIcon';
import getApi from '$app/api';

function ActiveFiltersDisplay({ filters }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const rcListUrl = useGetFullRoute(Routes.complexList);

  const onClickChangeFilters = () => {
    if (roomsFilter) {
      dispatch(onRoomFilterValuesChanged(roomsFilter.params.values));
    }
    if (completionLineFilter) {
      let years = [],
        quarters = [];
      completionLineFilter.params.values.forEach((value) => {
        const stringValue = value.toString();
        quarters.push(+last(stringValue));
        years.push(+take(4)(stringValue));
      });
      const dueDate = {
        year_min: 2000,
        year_max: Math.max(...years) || 3000,
        quarter_min: 1,
        quarter_max: Math.max(...quarters) || 4,
      };
      dispatch(onDueDateChange(dueDate));
    }
    history.push(rcListUrl, { openFilters: true });
  };

  if (!filters.filters.flatParams) {
    return <></>;
  }
  const Render = ({ children }) => (
    <Box m={'4px'}>
      <ChipCheckbox onChange={() => {}} isSelected={false}>
        {children}
      </ChipCheckbox>
    </Box>
  );
  const results = [];
  const roomsFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === 'rooms_num',
  );
  const pricesFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === FILTERS.PRICE,
  );
  const areaFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === FILTERS.SIZE_TOTAL,
  );
  const completionYearFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === 'year',
  );
  const completionQuarterFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === 'quarter',
  );
  const completionLineFilter = filters.filters.flatParams.find(
    (filter) => filter.filterName === 'line',
  );
  if (roomsFilter) {
    const uniqueFilters = roomsFilter.params.values
      ? new Set(
        [roomsFilter.params.min, roomsFilter.params.max, ...roomsFilter.params.values].filter(
          (item) => Boolean(item),
        ),
      )
      : new Set([roomsFilter.params.min, roomsFilter.params.max].filter((item) => Boolean(item)));
    results.push(
      <Render>
        <Trans>{Array.from(uniqueFilters).join(', ')} room(s)</Trans>
      </Render>,
    );
  }
  if (pricesFilter) {
    if (pricesFilter.params.min) {
      results.push(
        <Render>
          <Trans>
            from {pricesFilter.params.min} {pricesFilter.params.currency}
          </Trans>
        </Render>,
      );
    }
    if (pricesFilter.params.max) {
      results.push(
        <Render>
          <Trans>
            from {pricesFilter.params.max} {pricesFilter.params.currency}
          </Trans>
        </Render>,
      );
    }
  }
  if (areaFilter) {
    if (areaFilter.params.min) {
      results.push(
        <Render>
          <Trans>
            from {areaFilter.params.min} m{'\u00B2'}
          </Trans>
        </Render>,
      );
    }
    if (areaFilter.params.max) {
      results.push(
        <Render>
          <Trans>
            from {areaFilter.params.max} m{'\u00B2'}
          </Trans>
        </Render>,
      );
    }
  }
  if (completionYearFilter && completionQuarterFilter && completionYearFilter.params.max < 3000) {
    //year 30 means no completion date filter
    if (completionQuarterFilter.params.max && completionYearFilter.params.max) {
      results.push(
        <Render>
          <Trans>
            {completionQuarterFilter.params.max} q. {completionYearFilter.params.max}
          </Trans>
        </Render>,
      );
    }
  }
  if (completionLineFilter) {
    completionLineFilter.params.values.forEach((value) => {
      const stringValue = value.toString();
      results.push(
        <Render>
          <Trans>
            {' '}
            {last(stringValue)} q. {take(4)(stringValue)}
          </Trans>
        </Render>,
      );
    });
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <Box display={'flex'} flexDirection={'row'} flexWrap={'row'}>
      {!isMobile && (
        <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
          {results}
        </Box>
      )}
      <Box
        color={'#0092A8'}
        m={'2px 4px 2px 8px'}
        display={'flex'}
        alignItems={'center'}
        flexWrap={'nowrap'}
        whiteSpace={'nowrap'}
        style={{
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'Roboto',
        }}
        onClick={onClickChangeFilters}
      >
        <MoreFiltersIcon style={{ marginRight: '8px' }}></MoreFiltersIcon>
        {!isMobile && <Trans>Change filters</Trans>}
      </Box>
      {isMobile && (
        <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
          {results}
        </Box>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    paddingTop: '24px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '4px',
    },
  },
  container: {
    maxWidth: '1140px',
    width: '100%',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  layoutsContainer: {
    width: '100%',
    padding: '23px 48px 32px 48px',
    '& > * ': {
      marginBottom: '19px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  sideContent: {
    marginTop: 27,
    marginRight: 48,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const apiClient = getApi();
let currentDraft = undefined;

function processFilters({ roomsNumber, withFilters, filters, complexId, selectedQuartersIds }) {
  let draft = convertFiltersToAPIFormat({ filters });
  if (withFilters) {
    draft = adaptFiltersToLayouts(draft, complexId);
  } else {
    draft.filters.flatParams = [
      {
        filterName: 'complex_id',
        params: {
          complex_id: Number(complexId),
        },
      },
    ];
    if (roomsNumber) {
      draft.filters.flatParams.push({
        filterName: 'rooms_num',
        params: {
          values: [roomsNumber],
        },
      });
    }
    if (selectedQuartersIds?.length) {
      selectedQuartersIds.map((item) => +item);
      draft.filters.flatParams.push({
        filterName: 'line',
        params: {
          values: selectedQuartersIds.map((item) => +item),
        },
      });
    }
  }
  currentDraft = draft;
  return draft;
}

export default () => {
  const styles = useStyles();
  const { complexId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const isMobile = useIsMobile();
  const [complexData, setComplexData] = useState();
  const [layouts, setLayouts] = useState();
  const favourites = useSelector((state) => state.search.layoutsFavorites);
  const [showForm, setShowForm] = useState(false);
  const [selectedObject, setSelectedObject] = useState();
  const [limits, setLimits] = useState({ limit: 20, offset: 0 });
  const [count, setCount] = useState(0);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const subwayStations = useSelector((state) => subwayStationsDescriptorSelector(state));

  const currentRcUrl = useGetFullRoute(Routes.residentialComplex(complexId));

  const onRequestSubmit = useCallback(
    (data) => {
      apiClient.createDeveloperRequest(complexId, data).then(() => {
        ReactGA.event({
          category: 'request',
          action: 'web_complex_layout_request_form_sent',
        });
        displayRequestSentAlert();
      });
      setShowForm(false);
      setSelectedObject(undefined);
    },
    [complexId],
  );

  const onSubmitCallbackForm = useCallback(
    (data) => {
      apiClient.createDeveloperRequest(complexId, data).then(() => {
        ReactGA.event({
          category: 'request',
          action: 'web_complex_layout_request_callback_form_sent',
        });
        displayRequestSentAlert();
      });
      setShowCallbackForm(false);
    },
    [complexId],
  );

  const openFormWithLayout = useCallback((layout) => {
    setSelectedObject(layout);
    setShowForm(true);
  }, []);

  const onAddLayoutToFavorites = useCallback(
    (id) => {
      dispatch(getAddLayoutFavourite(id));
    },
    [dispatch, layouts],
  );
  const onRemoveLayoutFromFavorites = useCallback(
    (id) => {
      dispatch(getRemoveLayoutFavourite(id));
    },
    [dispatch, layouts],
  );

  const preparedFilters = useMemo(() => {
    const withFilters = location?.state?.withFilters;
    const roomsNumber = location?.state?.roomsNumber;
    const selectedQuartersIds = location?.state?.selectedQuartersIds;
    return processFilters({
      roomsNumber,
      withFilters,
      complexId,
      filters,
      selectedQuartersIds,
    });
  }, [filters, complexId, location]);

  useEffect(() => {
    apiClient.queryLayouts(preparedFilters, limits).then((data) => {
      setLayouts(data.results);
      setCount(data.count);
    });
    apiClient.fetchResidentialComplexById(complexId).then((res) => {
      const convertedComplexData = convertResidentialComplexData(res.data.results[0]);
      if (convertedComplexData.isVerified) {
        setComplexData(convertedComplexData);
        if (convertedComplexData.cityId && convertedComplexData.subwaysDistance) {
          dispatch(loadSubways(convertedComplexData.cityId));
        }
      } else {
        history.replace(currentRcUrl);
      }
    });
  }, [
    dispatch,
    complexId,
    setLayouts,
    setComplexData,
    preparedFilters,
    limits,
    history,
    currentRcUrl,
  ]);

  if (!layouts || !complexData) {
    return <AdvPageLoader />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <ComplexInfoForLayoutPage
          complexData={complexData}
          subwayStations={subwayStations}
          isVerified={complexData.isVerified}
          setShowForm={setShowForm}
          setShowCallbackForm={setShowCallbackForm}
          setShowPhoneNumberForm={(value) => {
            setShowPhoneNumberForm(value);
          }}
        >
        </ComplexInfoForLayoutPage>
        <div className={styles.content}>
          <div className={styles.layoutsContainer}>
            <ActiveFiltersDisplay filters={currentDraft} />
            { (layouts?.length > 0) ? (
              layouts.map((layout) => (
                <LayoutListing
                  layout={layout}
                  isFavourite={favourites.has(layout.id)}
                  onClarifyClick={openFormWithLayout}
                  onAddLayoutToFavorites={onAddLayoutToFavorites}
                  onRemoveLayoutFromFavorites={onRemoveLayoutFromFavorites}
                >
                </LayoutListing>
              ))
            ) : (
              <NoSearchResults />
            )}
            <Box>
              <LayoutsPagination limits={limits} onChangeLimits={setLimits} count={count}></LayoutsPagination>
            </Box>
          </div>
          <FindHousingEasyBanner className={styles.sideContent}></FindHousingEasyBanner>
        </div>
        <Footer></Footer>
        <section id="modals">
          <CloseableModal isOpen={showForm}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
              <DeveloperRequestForm
                type={selectedObject ? 'layout' : 'complex'}
                object={selectedObject || complexData}
                onSubmit={onRequestSubmit}
                isMobile={isMobile}
                onClose={() => {
                  setShowForm(false);
                  setSelectedObject(undefined);
                }}
              >
              </DeveloperRequestForm>
            </Box>
          </CloseableModal>
          <CloseableModal isOpen={showPhoneNumberForm}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'100%'}
              height={'100%'}
            >
              <RCContactPhonePanel
                RCDeveloper={complexData.realEstateDeveloper}
                phoneNumber={complexData.callbackPhone}
                onClose={() => setShowPhoneNumberForm(false)}
              >
              </RCContactPhonePanel>
            </Box>
          </CloseableModal>
          <CloseableModal isOpen={showCallbackForm}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'100%'}
              height={'100%'}
            >
              <RCCallbackForm
                RC={complexData}
                onSubmit={onSubmitCallbackForm}
                onClose={() => setShowCallbackForm(false)}
                isMobile={isMobile}
              >
              </RCCallbackForm>
            </Box>
          </CloseableModal>
        </section>
      </div>
    </div>
  );
}