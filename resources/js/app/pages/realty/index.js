import React, {useEffect, useState, Suspense, useCallback, useMemo} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {StaticMap} from 'react-map-gl';
import {Trans} from '@lingui/macro';
import {Divider, Modal, Hidden} from '@material-ui/core';

import FlatFeatures from './FlatFeatures';
import FlatParameters from './FlatParameters';
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
import {getById} from "$app/api/realty";
import useStyles from './style';

const featuresSelector = (state) => state.features.features;
const flatImagesSelector = (state) => state.ui.flatImages;

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {id, subpage} = useParams();

  const [phoneShown, onPhoneShow] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [realty, setRealty] = useState(null)
  const [loading, setLoading] = useState(false)

  const features = useSelector(featuresSelector);
  const flatImages = useSelector(flatImagesSelector);
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
  }, [isFavorite, id, onRemoveFromFavorites, onAddToFavorites, realty]);

  const showPhone = () => onPhoneShow(true);

  const showImages = (images, index = 0) => {
    setGalleryIndex(index);
    dispatch(showFlatImages(images));
  };

  useEffect(async () => {
    setLoading(true)

    const {results} = await getById(id);

    setRealty(results)
    setLoading(false)

  }, [id])

  useEffect(() => {
    dispatch(loadFeatures());
  }, [dispatch]);

  if (loading) {
    return <AdvPageLoader/>;
  }

  if (!realty) {
    return <NotFoundPage/>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.containerParent}>
        <div className={classes.container}>
          <section className={classes.galleryContainer}>
            <Hidden xsDown>
              <GridGallery
                images={realty.images}
                isLoading={loading}
                className={classes.gallery}
                onSelect={(index) => showImages(realty.images, index)}
              />
              <div className={classes.galleryButton} onClick={() => showImages(realty.images)}>
                <PhotoIcon/>
                &nbsp;&nbsp;<Trans>see {realty.images.length} photos</Trans>
              </div>
            </Hidden>
            <Hidden smUp>
              <SwipableRealtyListImageContainer images={realty.images} onSelect={() => null}/>
            </Hidden>
          </section>
        </div>
      </div>
      <div className={classes.columns}>
        <section className={classes.content}>
          <div className={classes.price}>
            <PriceField price={realty.price} currency={realty.currency}/>
          </div>
          <section className={classes.properties}>
            <RealtyProperties
              roomCount={realty.room_count}
              sizeTotal={realty.size_total}
              floor={realty.floor}
              floorCount={realty.floor_count}
            />
          </section>
          <div>
            <div className={classes.street}>
              {convertAddress(realty.street_type, realty.street_name, realty.house_number, realty.city.name)}
            </div>
            <div className={classes.publish}>
              <Trans>Published at: </Trans>
              {getTime(realty.created_at, language)}
            </div>
          </div>
          <Divider/>
          <div className={classes.title}>
            <Trans>Description</Trans>
          </div>
          {realty.description && realty.description.length && (

            <div className={classes.description} dangerouslySetInnerHTML={{__html: realty.description}}></div>
          )}
          <FlatParameters realty={realty}/>

          {realty.feature_ids && <FlatFeatures features={features} featureIds={realty.feature_ids}/>}

          {realty.longitude && realty.latitude && (
            <section className={classes.map}>
              <Link to={(location) => `${location.pathname}map/`}>
                <StaticMap
                  mapboxApiAccessToken={mapboxToken}
                  width={'100%'}
                  height={260}
                  latitude={realty.latitude}
                  longitude={realty.longitude}
                  zoom={16}
                  mapStyle="mapbox://styles/kelyanmedia/ckq13vomx07y017nie0wxjol1"
                  onLoad={handleMapOnLoad}
                >
                  <RealtyMarker
                    feature={realty.additional_info}
                    onMapRealtySelected={() => ({})}
                    currency={mapCurrency}
                  />
                </StaticMap>
              </Link>
            </section>
          )}
        </section>
        <section className={classes.columnRight}>
          <div className={classes.contacts}>
            <ContactPanel>
              <ContactPanelLandlord
                priceText={getRealtyPriceText(realty.adv_type, realty.currency, realty.price)}
                currency={realty.currency}
                advertiser={realty.advertiser}
                isPhoneShown={phoneShown}
                onPhoneClick={showPhone}
                isFavorite={isFavorite}
                onFavoriteClick={onFavoriteClick}
              />
            </ContactPanel>
          </div>
        </section>
      </div>
      <Footer/>
      <Modal
        aria-labelledby="Gallery"
        aria-describedby="apartment image gallery"
        open={flatImages !== null}
        BackdropProps={{
          style: {
            backgroundColor: '#fff',
          },
        }}
      >
        <div style={{outline: 0}}>
          <ImageGalleryFullScreen
            images={flatImages}
            startIndex={galleryIndex}
            onClose={() => {
              setGalleryIndex(0);
              showImages(null);
            }}
          />
        </div>
      </Modal>
      <Modal
        aria-labelledby="Interactive map"
        aria-describedby="apartment location"
        open={showMap}
        BackdropProps={{
          style: {
            backgroundColor: '#fff',
          },
        }}
      >
        <div style={{outline: 0}}>
          <Suspense fallback={<div/>}>
            <MapSnippet data={realty}/>
          </Suspense>
        </div>
      </Modal>
    </div>
  );
};