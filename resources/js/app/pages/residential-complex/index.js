import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import ReactGA from 'react-ga';
import {
  ClickAwayListener,
  Divider,
  Hidden,
  makeStyles,
  Modal,
  Paper,
  Box, Typography,
} from '@material-ui/core'
import WebsiteIcon from '@material-ui/icons/Language';
import { Trans, t } from '@lingui/macro';
import { equals } from 'ramda';

import NotFoundPage from '$app/pages/NotFoundPage';
import ResidentialComplexCharacteristicsGrid from '$app/components/residentialComplexes/ResidentialComplexCharasteristicsGrid';
import ResidentialComplexPageBreadcrumbs from '$app/components/residentialComplexes/ResidentialComplexPageBreadcrumbs'
import SwipableRealtyListImageContainer from '$app/components/realty-list/SwipableRealtyListImageContainer';
import RCConstructionProgress from '$app/components/residentialComplexes/RCConstructionProgress';
import DeveloperRequestForm from '$app/components/residentialComplexes/DeveloperRequestForm';
import RCContactPhonePanel from '$app/components/residentialComplexes/RCContactPhonePanel';
import ImageGalleryFullScreen from '$app/components/imageGallery/ImageGalleryFullScreen';
import DeveloperInfoPanel from '$app/components/residentialComplexes/DeveloperInfoPanel';
import ResidentialComplexMarker from '$app/components/map/ComplexMarker';
import RCCallbackForm from '$app/components/residentialComplexes/RCCallbackForm';
import LayoutsPreview from '$app/components/residentialComplexes/LayoutsPreview';
import RCPromotions from '$app/components/residentialComplexes/RCPromotions';
import RCDocuments from '$app/components/residentialComplexes/RCDocuments';
import TextWithReadMore from '$app/components/common/TextWithReadMore';
import CloseableModal from '$app/components/common/CloseableModal';
import GridGallery from '$app/components/grid-gallery';
import AdvPageLoader from '$app/components/common/AdvPageLoader';
import Text, { TextColors } from '$app/components/common/Text';
import StyledButton from '$app/components/common/StyledButton';
import { setMapLanguage } from '$app/components/map/helpers';
import Footer from '$app/components/common/footer/Footer';
import Title from '$app/components/common/Title';
import {getRegionIdFromTokenValue} from '$app/utlis/seoUrlParser'
import { formatToCurrencyPrice } from '$app/utlis/price';
import { prettyURL } from '$app/utlis/common';
import Routes from '$app/utlis/routes';
import {
  adaptFiltersToLayouts,
  applyRCSpecificChanges,
  convertResidentialComplexData,
  displayRequestSentAlert,
  getGeoFeatureFromRealEstateComplex,
} from '$app/utlis/realEstateDevelopers';
import { getAddRCFavourite, getRemoveRCFavourite } from '$app/redux/actions/apiActions';
import { selectFilters as convertFiltersToAPIFormat } from '$app/redux/selectors/selectors';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import useIsMobile from '$app/hooks/useIsMobile';
import PhotoIcon from '$app/icons/PhotoIcon';
import { currencies, mapboxToken } from '$js/config';
import getApi from '$app/api';
import {getTest} from '$app/api/complex'
const MapSnippetLazy = React.lazy(() => import('$app/components/mapSnippet/MapSnippet'));

import useStyles from './style';


const defaultFilters = {
  filters: {
    geoParams: [{ filterName: 'city', params: { city: 1 } }],
    flatParams: [
      {
        filterName: 'lines_ranges',
        params: {
          year_max: 3000,
          year_min: 2000,
          quarter_max: 4,
          quarter_min: 1,
        },
      },
    ],
  },
};

const apiClient = getApi();

export default () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { complexId } = useParams();
  const isMobile = useIsMobile();

  const openRequestForm = new URLSearchParams(window.location.search).get('openRequestForm');

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [complexData, setComplexData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(openRequestForm === 'fillForm');
  const [filteredCount, setFilteredCount] = useState(0);
  const [showContactVariants, setShowContactVariants] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
  const [startingTags, setStartingTags] = useState([]);

  const filters = useSelector((state) => state.filters);
  const RCFavourites = useSelector((state) => state.search.RCFavorites);
  const language = useSelector((state) => state.ui.language);

  const mapCurrency = currencies.sum.value;
  const showMap = false; //TODO: fix large map

  const isFavorite = useMemo(() => {
    return RCFavourites.has(Number(complexId)) || RCFavourites.has(complexId);
  }, [RCFavourites, complexId]);

  const onAddToFavorites = useCallback((id) => dispatch(getAddRCFavourite(id)), [dispatch]);
  const onRemoveFromFavorites = useCallback((id) => dispatch(getRemoveRCFavourite(id)), [dispatch]);

  const handleMapOnLoad = useCallback((event) => {
      setMapLanguage(event, language);
    },
    [language],
  );

  const onFavoriteClick = useCallback(() => {
    if (isFavorite) {
      onRemoveFromFavorites(complexId);
    } else {
      onAddToFavorites(complexId);
    }
  }, [isFavorite, complexId, onRemoveFromFavorites, onAddToFavorites, complexData]);

  const setStartingTagsForRoomNumber = useCallback((roomNumber) => {
    const results = [];
    switch (roomNumber) {
      case 1: {
        results.push({
          id: 'one_room',
          name: '1к',
        });
        break;
      }
      case 2: {
        results.push({
          id: 'two_rooms',
          name: '2к',
        });
        break;
      }
      case 3: {
        results.push({
          id: 'three_rooms',
          name: '3к',
        });
        break;
      }
      case 4: {
        results.push({
          id: 'four_rooms',
          name: '4к',
        });
        break;
      }
      case 5: {
        results.push({
          id: 'five_and_more',
          name: '5+ к',
        });
        break;
      }
      default: {
        throw new Error(`Can't get starting tags for following rooms number: ${roomNumber}`);
      }
    }
    setStartingTags(results);
  }, []);

  const onShowImages = (index = 0, show = true) => {
    setGalleryIndex(index);
    setShowImages(show);
  };

  const onRequestSubmit = useCallback((data) => {
      apiClient.createDeveloperRequest(complexId, data).then(() => {
        ReactGA.event({
          category: 'request',
          action: 'web_complex_request_form_sent',
        });
        displayRequestSentAlert();
      });
      setShowForm(false);
      setStartingTags([]);
    },
    [complexId],
  );

  const onSubmitCallbackForm = useCallback((data) => {
      apiClient.createDeveloperRequest(complexId, data).then(() => {
        ReactGA.event({ category: 'request', action: 'web_complex_request_callback_form_sent' });
        displayRequestSentAlert();
      });
      setShowCallbackForm(false);
    },
    [complexId],
  );

  useEffect(async () => {

    const {results} = await getTest();

    setIsLoading(false);

    const convertedComplexData = convertResidentialComplexData(results);
    setComplexData(convertedComplexData);

  }, [dispatch, complexId]);

  const layoutsForCurrentComplexUrl = useGetFullRoute(Routes.residentialComplexLayouts(complexId));

  const splittedAddress  = complexData?.address.split(', ')
  const address = `${splittedAddress?.[0]}, ${splittedAddress?.[1]}`

  if (!complexId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <AdvPageLoader />;
  }

  if (!complexData) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.containerParent}>
        <div className={styles.container}>
          <div className={styles.galleryContainer}>
            <Hidden xsDown>
              <GridGallery
                images={complexData.images}
                className={styles.gallery}
                onSelect={(index) => onShowImages(index)}
              />
              <div className={styles.galleryButton} onClick={() => onShowImages()}>
                <PhotoIcon />
                &nbsp;&nbsp;
                <Trans>see {complexData.images.length} photos</Trans>
              </div>
            </Hidden>
            <Hidden smUp>
              <SwipableRealtyListImageContainer images={complexData.images} onSelect={() => null} />
            </Hidden>
          </div>
          <div className={styles.columns}>
            <div className={styles.content}>
              <section id={'name'}>
                <Box
                  display={'flex'}
                  alignItems={{ xs: 'flexStart', sm: 'center' }}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                >
                  <Text color={TextColors.secondary} paddingRight={3}>
                    <Trans>
                      Nearest due date - in {complexData.completionQuarter} q.{' '}
                      {complexData.completionYear}
                    </Trans>
                  </Text>
                  <section id={'url'}>
                    {!!complexData.url && (
                      <Box marginTop={{ xs: 1, sm: 0 }}>
                        <a
                          href={complexData.url}
                          rel="noopener noreferrer nofollow"
                          className={styles.website}
                          target="_blank"
                        >
                          <WebsiteIcon htmlColor="#0092A8" className={styles.websiteIcon} />
                          <span className={styles.linkText}>{prettyURL(complexData.url)}</span>
                        </a>
                      </Box>
                    )}
                  </section>
                </Box>
                <Text pt={'8px'}>
                  <Typography variant={'h1'}>
                    {complexData.name}
                  </Typography>
                </Text>

              </section>

              <section id={'price'}>
                <div className={styles.priceOnTop}>
                  <b>
                    <Trans>from </Trans> {formatToCurrencyPrice(complexData.minimalPriceUah)}
                    <Trans>/m{'\u00B2'}</Trans>
                  </b>
                </div>
              </section>
              <section id={'address'}>
                <div className={styles.addressText}>
                  {address}, {complexData.cityName}
                </div>
              </section>
              <section id={'short-characteristics'}>
                <ResidentialComplexCharacteristicsGrid
                  short
                  properties={complexData.houseAttributes}
                />
              </section>
              <Divider />
              <section id={'layouts-preview'}>
                <LayoutsPreview
                  complexId={complexData.id}
                  layouts={complexData.lines}
                  filteredCount={filteredCount}
                  onLayoutClick={(roomsNumber, selectedQuartersIds) => {
                    if (complexData.isVerified) {
                      history.push(layoutsForCurrentComplexUrl, {
                        roomsNumber,
                        selectedQuartersIds,
                      });
                    } else {
                      setStartingTagsForRoomNumber(roomsNumber);
                      setShowForm(true);
                    }
                  }}
                  onFiltersClick={() => {
                    if (complexData.isVerified) {
                      history.push(layoutsForCurrentComplexUrl, {
                        withFilters: true,
                      });
                    } else {
                      setShowForm(true);
                    }
                  }}
                  isVerified={complexData.isVerified}
                />
              </section>
              <section id={'promotions'}>
                {complexData.promotions?.length > 0 && (
                  <>
                    <RCPromotions promotions={complexData.promotions} isMobile={isMobile} />
                  </>
                )}
              </section>
              <section id={'location'}>
                <Title>
                  <Typography variant={'h2'}>
                    <Trans>Location {complexData.name}</Trans>
                  </Typography>
                </Title>
                <Text size={14} mb={'8px'}>
                  {complexData.address}
                </Text>
                <StaticMap
                  mapboxApiAccessToken={mapboxToken}
                  width={'100%'}
                  height={'400px'}
                  latitude={complexData.coordinates.latitude}
                  longitude={complexData.coordinates.longitude}
                  zoom={14}
                  mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
                  // mapStyle="mapbox://styles/wrenchtech/cjnbijdyp5z8f2rleqgbm4bf5"
                  onLoad={handleMapOnLoad}
                >
                  <ResidentialComplexMarker
                    feature={getGeoFeatureFromRealEstateComplex(complexData)}
                    onSelected={() => ({})}
                    currency={mapCurrency}
                  />
                </StaticMap>
              </section>
              <section id={'characteristics'}>
                <Title>
                  <Typography variant={'h3'}>
                    <Trans>All characteristics {complexData.name}</Trans>
                  </Typography>
                </Title>
                <ResidentialComplexCharacteristicsGrid properties={complexData.houseAttributes} />
              </section>
              <section id={'advantages'}>
                {Boolean(complexData.complexAdvantages.length) && (
                  <>
                    <Title>
                      <Typography variant={'h3'}>
                        <Trans>Advantages</Trans>
                      </Typography>
                    </Title>
                    <ResidentialComplexCharacteristicsGrid
                      properties={complexData.complexAdvantages}
                      noSubheader
                    />
                  </>
                )}
              </section>
              <section id={'infrastructure'}>
                {Boolean(complexData.infrastructure.length) && (
                  <>
                    <Title>
                      <Typography variant={'h3'}>
                        <Trans>Infrastructure</Trans>
                      </Typography>
                    </Title>
                    <ResidentialComplexCharacteristicsGrid
                      properties={complexData.infrastructure.map((item) => ({
                        title: item.value,
                        value: [t`${item.distance} minutes walk`],
                        icon: item.icon,
                      }))}
                      reverseBoldness
                    />
                  </>
                )}
              </section>
              <section id={'construction-progress'}>
                {complexData.constructionProgress?.length > 0 && (
                  <>
                    <RCConstructionProgress
                      progress={complexData.constructionProgress}
                      isMobile={isMobile}
                    />
                  </>
                )}
              </section>
              <section id={'documents'}>
                {complexData.documents?.length > 0 && (
                  <>
                    <RCDocuments documents={complexData.documents} isMobile={isMobile} />
                  </>
                )}
              </section>
              <section id={'about'}>
                <Title>
                  <Typography variant={'h3'}>
                    <Trans>About</Trans>
                  </Typography>
                </Title>
                <TextWithReadMore text={complexData.description} />
              </section>
            </div>
            <div className={styles.columnRight}>
              <DeveloperInfoPanel
                className={styles.developerContacts}
                complexData={complexData}
                isFavorite={isFavorite}
                onFavoriteClick={onFavoriteClick}
                button={
                  <>
                    {!isMobile && (
                      <ClickAwayListener
                        onClickAway={() => {
                          setShowContactVariants(false);
                        }}
                      >
                        <div className={styles.contactDeveloperContainer}>
                          <StyledButton
                            fullWidth
                            className={styles.developer_button}
                            onClick={() => {
                              setShowContactVariants((value) => !value);
                            }}
                          >
                            <Text size={16}>
                              <Trans>Contact a consultant</Trans>{' '}
                              {showContactVariants ? '\u25b4' : '\u25be'}
                            </Text>
                          </StyledButton>
                          <Paper
                            style={{
                              display: showContactVariants ? 'block' : 'none', // TODO: remove code duplication
                              position: 'absolute',
                              top: '56px',
                              width: '285px',
                              borderRadius: '20px',
                            }}
                            elevation={2}
                          >
                            <Box
                              height={'48px'}
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'center'}
                              onClick={() => {
                                setShowForm(true);
                                setShowContactVariants(false);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Trans>Send a request</Trans>
                            </Box>
                            <Box
                              height={'48px'}
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'center'}
                              onClick={() => {
                                setShowPhoneNumberForm(true);
                                setShowContactVariants(false);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Trans>Call</Trans>
                            </Box>
                            <Box
                              height={'48px'}
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'center'}
                              onClick={() => {
                                setShowCallbackForm(true);
                                setShowContactVariants(false);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Trans>Callback</Trans>
                            </Box>
                          </Paper>
                        </div>
                      </ClickAwayListener>
                    )}
                  </>
                }
              />
            </div>
          </div>
          <Hidden mdUp>
            <StyledButton
              className={styles.float_button}
              onClick={() => {
                setShowContactVariants(true);
              }}
            >
              <Trans>Contact a consultant</Trans>
            </StyledButton>
          </Hidden>
          <Hidden smUp>
            <Box p={'40px'} />
          </Hidden>
        </div>
      </div>
      <Footer />
      <section id={'modals'}>
        <Modal
          aria-labelledby="Gallery"
          aria-describedby="apartment image gallery"
          open={showImages}
          BackdropProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
        >
          <div style={{ outline: 0 }}>
            <ImageGalleryFullScreen
              images={complexData.images}
              startIndex={galleryIndex}
              onClose={() => {
                onShowImages(0, false);
              }}
            />
          </div>
        </Modal>
        <Modal
          aria-labelledby="Interactive map"
          aria-describedby="complex location"
          open={showMap}
          BackdropProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
        >
          <div style={{ outline: 0 }}>
            <Suspense fallback={<div />}>
              <MapSnippetLazy data={complexData} type="complex" />
            </Suspense>
          </div>
        </Modal>
        <CloseableModal isOpen={showForm}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <DeveloperRequestForm
              type={'complex'}
              object={complexData}
              startingTags={startingTags}
              onSubmit={onRequestSubmit}
              onClose={() => {
                setShowForm(false);
                setStartingTags([]);
              }}
              isMobile={isMobile}
            />
          </Box>
        </CloseableModal>
        {isMobile && (
          <CloseableModal
            isOpen={showContactVariants}
            onClose={() => {
              setShowContactVariants(false);
            }}
          >
            <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Paper
                style={{
                  width: 'calc(100% - 32px)',
                  borderRadius: '20px',
                }}
                elevation={2}
              >
                <Box
                  height={'48px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() => {
                    setShowForm(true);
                    setShowContactVariants(false);
                  }}
                >
                  <Text size={16}>
                    <Trans>Send a request</Trans>
                  </Text>
                </Box>
                <Box
                  height={'48px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() => {
                    ReactGA.event({
                      category: 'request',
                      action: 'web_complex_request_call',
                    });
                    if (isMobile) {
                      window.open(`tel:${complexData.callbackPhone}`, '_blank');
                    } else {
                      setShowPhoneNumberForm(true);
                      setShowContactVariants(false);
                    }
                  }}
                >
                  <Text size={16}>
                    <Trans>Call</Trans>
                  </Text>
                </Box>
                <Box
                  height={'48px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() => {
                    setShowCallbackForm(true);
                    setShowContactVariants(false);
                  }}
                >
                  <Text size={16}>
                    <Trans>Callback</Trans>
                  </Text>
                </Box>
              </Paper>
            </Box>
          </CloseableModal>
        )}
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
            />
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
            />
          </Box>
        </CloseableModal>
      </section>
    </div>
  );
};