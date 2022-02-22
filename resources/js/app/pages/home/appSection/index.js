import React from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from "@material-ui/core/IconButton";
import {Trans} from '@lingui/macro';
import classnames from "classnames";

import useIsMobile from '$app/hooks/useIsMobile';
import phoneOffsetRight from '@app/img/phoneOffsetRight.png';
import shadedSettings from '@app/img/shadedSettings.png';
import shadedMap from '@app/img/shadedMap.png';
import shadedBell from '@app/img/shadedBell.png';

import GooglePlayColorIcon from "$app/icons/GooglePlayColorIcon";
import AppleIcon from "$app/icons/AppleIcon";
import useStyles from './style'

const AppSection = ({complexesLength}) => {
  const styles = useStyles();
  const isMobile = useIsMobile();

  return (
    <Box
      id={'app'}
      className={classNames(styles.app, styles.padding, {
        [styles.noTopBorderRadius]: complexesLength === 0,
      })}
    >
      <Box height={'100%'} width={'100%'}>
        <Grid
          container
          direction={'row'}
          justify={isMobile ? 'center' : 'space-between'}
          alignItems={'center'}
          spacing={10}
        >
          <Grid item xs={12} md={8}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              pr={isMobile ? 0 : '100px'}
            >
              <h1>
                <Trans>
                  Search is{' '}
                  <Hidden mdUp>
                    <br/>
                  </Hidden>
                  more convenient in the app
                </Trans>
              </h1>
              <p>
                <Trans>
                  We want to make finding housing easy, convenient and in a smartphone. That is
                  why our main tool is the mobile application.
                </Trans>
              </p>
              <Box p={'40px 0 20px 0'}>
                <Box display={'flex'} alignItems={'center'} mb={2}>
                  <img src={shadedSettings} style={{height: '80px'}} alt={''}/>
                  <Trans>Set your filters for search</Trans>
                </Box>
                <Box display={'flex'} alignItems={'center'} mb={2}>
                  <img src={shadedMap} style={{height: '80px'}} alt={''}/>
                  <Trans>See locations and prices on the map</Trans>
                </Box>
                <Box display={'flex'} alignItems={'center'} mb={2}>
                  <img src={shadedBell} style={{height: '80px'}} alt={''}/>
                  <Trans>Receive notifications about new options for your request</Trans>
                </Box>
              </Box>
              <Box display={'flex'} mt={isMobile ? 0 : '64px'}>
                <Box>
                  <IconButton className={classnames(styles.iconBtn, styles.googleBtn)}>
                    <GooglePlayColorIcon/> <span style={{marginLeft: 10}}>Google Play</span>
                  </IconButton>
                </Box>
                <Box p={isMobile ? 1 : 2}/>
                <Box>
                  <IconButton className={classnames(styles.iconBtn, styles.appleBtn)}>
                    <AppleIcon /> <span style={{marginLeft: 10}}>App Store</span>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Box position={'relative'} mt={-2} ml={-12}>
                <img src={phoneOffsetRight} alt="" className={styles.img}/>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default AppSection;
