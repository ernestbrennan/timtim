import GooglePlayRentalsLink from './links/GooglePlayRentalsLink';
import GooglePlayRoundIcon from '../../icons/GooglePlayRoundIcon';
import AppStoreRentalsLink from './links/AppStoreRentalsLink';
import AppStoreRoundIcon from '../../icons/AppStoreRoundIcon';
import React from 'react';
import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles({
  downloadContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadLabel: {
    fontSize: 14,
    textDecoration: 'none',
    marginRight: 15,
    marginLeft: 15,
    lineHeight: 1,
    color: '#54606A',
    paddingLeft: 10,
  },
  storeIcon: {
    paddingRight: 12,
    paddingLeft: 12,
  },
});

const DownloadOurApp = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.downloadContainer} {...props}>
      Скачать приложение
      <GooglePlayRentalsLink className={styles.storeIcon}>
        <GooglePlayRoundIcon className={styles.storeIcon} />
      </GooglePlayRentalsLink>
      <AppStoreRentalsLink>
        <AppStoreRoundIcon />
      </AppStoreRentalsLink>
    </div>
  );
};

export default DownloadOurApp;
