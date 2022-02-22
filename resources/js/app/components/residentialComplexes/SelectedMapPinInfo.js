import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import ResidentialComplexListing from './ResidentalComplexListing';
import SelectedAddressPanel from './SelectedAddressPanel';
import Copyright from '../common/Copyright';
import DownloadOurApp from '../common/DownloadOurApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  listingsContainer: {
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#ffffff',
    padding: 16,
  },
}));

const SelectedMapPinInfo = ({
  listing,
  onClose,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const { RCFavorites: favourites } = useSelector((state) => state.search);
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <SelectedAddressPanel address={listing.address} onClose={onClose} />
      <div className={styles.listingsContainer}>
        <ResidentialComplexListing
          residentialComplex={listing}
          onGeoZoomSelected={() => {}}
          onHover={() => {}}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          isFavorite={favourites.has(listing.id) || favourites.has(String(listing.id))}
        />
      </div>
      <div className={styles.footer}>
        <Copyright />
        <DownloadOurApp />
      </div>
    </div>
  );
};

export default SelectedMapPinInfo;
