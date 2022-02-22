import React, {useEffect, useState, Suspense, useCallback, useMemo} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {StaticMap} from 'react-map-gl';
import {Trans} from '@lingui/macro';
import {Divider, Modal, Hidden, Box, Typography, ClickAwayListener, Paper} from '@material-ui/core';

import NotFoundPage from '../NotFoundPage';
import GridGallery from '$app/components/grid-gallery';
import RealtyProperties from '$app/components/realty-list/RealtyProperties';
import RealtyMarker from '$app/components/map/RealtyMarker';
import ContactPanel from '$app/components/contactPanel/ContactPanel';
import ContactPanelLandlord from '$app/components/contactPanel/ContactPanelLandlord';
import PriceField from '$app/components/contactPanel/PriceField';
import ImageGalleryFullScreen from '$app/components/imageGallery/ImageGalleryFullScreen';
import SwipableRealtyListImageContainer from '$app/components/realty-list/SwipableRealtyListImageContainer';
import AdvPageLoader from '$app/components/common/AdvPageLoader';
import Footer from '$app/components/common/footer/Footer';
import {setMapLanguage} from '$app/components/map/helpers';
import {showFlatImages} from '$app/redux/actions/uiActions';
import {addToFavorites, removeFromFavorites} from '$app/redux/actions/apiActions';
import {loadFeatures} from '$app/redux/actions/apiActions';
import PhotoIcon from '$app/icons/PhotoIcon';
import MapSnippet from '$app/components/mapSnippet/MapSnippet'
import {convertAddress, getTime} from "$app/utlis/flat";
import {getRealtyPriceText} from '$js/utils/price'
import {mapboxToken, currencies} from '$js/config'
import {getById} from "$app/api/complex";
import useStyles from './style';
import Text, {TextColors, TextWeight} from "$app/components/common/Text";
import WebsiteIcon from "@material-ui/icons/Language";
import {prettyURL} from "$app/utlis/common";
import {formatToCurrencyPrice} from "$app/utlis/price";
import ComplexFeaturesGrid from "$app/components/complex-list/ComplexFeaturesGrid";
import DeveloperInfoPanel from "$app/components/complex-list/DeveloperInfoPanel";
import Title from "$app/components/common/Title";
import ResidentialComplexMarker from "$app/components/map/ComplexMarker";
import {getGeoFeatureFromRealEstateComplex} from "$app/utlis/realEstateDevelopers";
import ComplexMarker from "$app/components/map/ComplexMarker";
import TextWithReadMore from "$app/components/common/TextWithReadMore";
import StyledButton from "$app/components/common/StyledButton";
import useIsMobile from "$app/hooks/useIsMobile";
import DeveloperRequestForm from "$app/components/residentialComplexes/DeveloperRequestForm";
import CloseableModal from "$app/components/common/CloseableModal";
import CloseIcon from "$app/icons/CloseIcon";
import DeveloperInfo from "$app/components/residentialComplexes/DeveloperInfo";
import IconButton from "@material-ui/core/IconButton";

const flatImagesSelector = (state) => state.ui.flatImages;

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {id, subpage} = useParams();
  const isMobile = useIsMobile();

  const [phoneShown, onPhoneShow] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [complex, setComplex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const favorites = useSelector((state) => state.search.favorites);
  const language = useSelector((state) => state.ui.language);

  const mapCurrency = currencies.sum.value;
  const showMap = subpage === 'map';

  const isFavorite = useMemo(() => {
    return favorites.has(Number(id)) || favorites.has(id);
  }, [favorites, id]);

  const onAddToFavorites = useCallback((id) => dispatch(addToFavorites(id)), [dispatch]);
  const onRemoveFromFavorites = useCallback((id) => dispatch(removeFromFavorites(id)), [dispatch]);

  const handleMapOnLoad = useCallback((event) => setMapLanguage(event, language), [language]);

  const onFavoriteClick = useCallback(() => {
    isFavorite ? onRemoveFromFavorites(id) : onAddToFavorites(id)
  }, [isFavorite, id, onRemoveFromFavorites, onAddToFavorites, complex]);

  const showPhone = () => onPhoneShow(true);

  const showImages = (images, index = 0) => {
    setGalleryIndex(index);
    dispatch(showFlatImages(images));
  };

  useEffect(async () => {
    setLoading(true)

    const {results} = await getById(id);

    setComplex(results)
    setLoading(false)

  }, [id])

  useEffect(() => {
    dispatch(loadFeatures());
  }, [dispatch]);

  if (loading) {
    return <AdvPageLoader/>;
  }


  if (!complex) {
    return <NotFoundPage/>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.containerParent}>
        <div className={classes.container}>
          <div className={classes.galleryContainer}>
            <Hidden xsDown>
              <GridGallery
                images={complex.images}
                className={classes.gallery}
                onSelect={(index) => showImages(index)}
              />
              <div className={classes.galleryButton} onClick={() => showImages()}>
                <PhotoIcon/>
                &nbsp;&nbsp;
                <Trans>see {complex.images.length} photos</Trans>
              </div>
            </Hidden>
            <Hidden smUp>
              <SwipableRealtyListImageContainer images={complex.images} onSelect={() => null}/>
            </Hidden>
          </div>

          <div className={classes.columns}>
            <div className={classes.content}>
              <Box
                display={'flex'}
                alignItems={{xs: 'flexStart', sm: 'center'}}
                flexDirection={{xs: 'column', sm: 'row'}}
                mb={3}
              >
                <Box pr={4}>
                  <Typography variant={'subtitle1'} pr={8}>
                    <Trans>
                      Nearest due date - in {complex.nearest_release_quarter} q.{' '}
                      {complex.nearest_release_year}
                    </Trans>
                  </Typography>
                </Box>
                {!!complex.url && (
                  <Box marginTop={{xs: 1, sm: 0}}>
                    <a
                      href={complex.url}
                      rel="noopener noreferrer nofollow"
                      className={classes.website}
                      target="_blank"
                    >
                      <WebsiteIcon htmlColor="#0092A8"/>
                      <span className={classes.linkText}>{prettyURL(complex.url)}</span>
                    </a>
                  </Box>
                )}
              </Box>
              <Typography variant={'h1'} color={'primary'}>
                {complex.name}
              </Typography>
              <div className={classes.priceOnTop}>
                <b>
                  <Trans>from </Trans> {formatToCurrencyPrice(complex.min_per_square_meter_price)}
                  <Trans>/m{'\u00B2'}</Trans>
                </b>
              </div>

              <div className={classes.addressText}>
                {[complex.street_type, complex.street_name, complex.house_number, complex.city.name].filter((v) => !!v).join(', ')}
              </div>

              <Box mb={3}>
                <Typography variant={'h2'} color={'primary'}>
                  Характеристики ЖК
                </Typography>
                <ComplexFeaturesGrid short properties={complex.characteristics}/>
                <Divider/>
              </Box>

              {complex.longitude && complex.latitude && (
                <Box mb={3}>
                  <Typography variant={'h2'} color={'primary'}>
                    <Trans>Location {complex.name}</Trans>
                  </Typography>
                  <div className={classes.addressText}>
                    {[complex.street_type, complex.street_name, complex.house_number, complex.city.name].filter((v) => !!v).join(', ')}
                  </div>
                  <Link to={(location) => `${location.pathname}map/`}>
                    <StaticMap
                      mapboxApiAccessToken={mapboxToken}
                      width={'100%'}
                      height={260}
                      latitude={complex.latitude}
                      longitude={complex.longitude}
                      zoom={16}
                      mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
                      onLoad={handleMapOnLoad}
                    >
                      <ComplexMarker feature={complex.additional_info} onSelected={() => ({})}/>
                    </StaticMap>
                  </Link>

                </Box>
              )}

              <Box mb={3}>
                <Typography variant={'h2'} color={'primary'}>
                  Все Характеристики ЖК
                </Typography>
                <ComplexFeaturesGrid properties={complex.characteristics}/>
              </Box>
              <Box mb={3}>
                <Typography variant={'h2'} color={'primary'}>
                  Инфаструктура
                </Typography>
                <ComplexFeaturesGrid properties={complex.infrastructure}/>
              </Box>

              {complex.description && complex.description.length && (
                <Box mb={6} className={classes.about}>
                  <Typography variant={'h2'}>
                    <Trans>About</Trans>
                  </Typography>

                  <div dangerouslySetInnerHTML={{__html: complex.description}}/>
                </Box>
              )}

            </div>
            <div className={classes.columnRight}>
              <DeveloperInfoPanel
                className={classes.developerContacts}
                complex={complex}
                isFavorite={isFavorite}
                onFavoriteClick={onFavoriteClick}
                onShowContact={() => setShowContact(true)}
              />
            </div>

          </div>
        </div>
      </div>
      <Footer/>
      <CloseableModal isOpen={showContact}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Paper elevation={4} style={{borderRadius: '8px'}}>
            <Box
              p={'0 24px 24px 24px'}
              style={{position: 'relative'}}
              width={'400px'}
              mt={'40px'}
            >
              <IconButton className={classes.closeBtn} onClick={() => setShowContact(false)}>
                <CloseIcon/>
              </IconButton>

              <Typography variant={'h2'}><Trans>Consultant contact info</Trans></Typography>
              <Box mt={3} mb={3}>
                <Typography variant={'h1'} color={'primary'}>{complex.developer.phone}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </CloseableModal>
    </div>
  );
};