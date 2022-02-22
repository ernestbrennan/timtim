import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import classNames from 'classnames';

import Text from '../common/Text';
import AppStoreRentalsLink from '../common/links/AppStoreRentalsLink';
import GooglePlayRentalsLink from '../common/links/GooglePlayRentalsLink';
import { ReactComponent as DrawnAppStoreLabel } from '@app/svg/drawnAppStoreLabel.svg';
import { ReactComponent as DrawnGooglePlayLabel } from '@app/svg/drawnGooglePlayLabel.svg';
import giraffe from '@app/svg/giraffe.svg';
import logo from '@app/svg/logoMin.svg';

const storeLinkStyle = {
  cursor: 'pointer',
  height: '41px',
  width: '122px',
};

const useStyles = makeStyles({
  wrapper: {
    height: 300,
    minWidth: 300,
    padding: '36px 24px 24px',
    backgroundColor: '#FCE5D7',
    backgroundImage: `url(${giraffe})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    borderRadius: 8,
  },
  title: {
    marginTop: 40,
    lineHeight: '36px',
  },
  buttons: {
    marginTop: 24,
  },
  button: {
    marginLeft: 10,
  },
});

function FindHousingEasyBanner({ className }) {
  const classes = useStyles();

  return (
    <Box className={classNames(classes.wrapper, className)}>
      <img src={logo} alt="TimTim logo" height={45} />
      <Text size={34} weight="heavy" className={classes.title}>
        <Trans>Finding<br />housing is easy!</Trans>
      </Text>
      <Box display="flex" flexDirection="row" justifyContent="center" className={classes.buttons}>
        <GooglePlayRentalsLink>
          <DrawnGooglePlayLabel style={storeLinkStyle} />
        </GooglePlayRentalsLink>
        <AppStoreRentalsLink className={classes.button}>
          <DrawnAppStoreLabel style={storeLinkStyle} />
        </AppStoreRentalsLink>
      </Box>
    </Box>
  );
}

export default FindHousingEasyBanner;
