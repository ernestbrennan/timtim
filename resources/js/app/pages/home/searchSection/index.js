import React, { useCallback } from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { Trans } from '@lingui/macro';

import Text, { TextColors, TextWeight } from '$app/components/common/Text';
import SearchTypeSwitcher from '$app/components/home-page/SearchTypeSwitcher';
import SearchBar from '$app/components/home-page/search-bar';
import useIsMobile from '$app/hooks/useIsMobile';
import homeBackgroundImage from '@app/img/home/homeBackgroundImage.png'
import useStyles from './style';

export default ({ searchType, setSearchType, onApplySearch }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();

  const handleSearchType = useCallback((event, value) => {
      setSearchType(value);
    },
    [setSearchType],
  );

  return (
    <div id={'top'} className={classNames(classes.topBlock, classes.padding)}>
      <Box
        display={'flex'}
        // flex={isMobile ? undefined : 1}
        width={'100%'}
        flexDirection={'column'}
        justifyContent={isMobile ? undefined : 'center'}
        alignItems={'center'}
        textAlign={'center'}
      >
        {isMobile ? (
          <Box display={'flex'} mt={4} justifyContent={'start'} flexDirection={'column'}>
            <Text color={TextColors.contrast} size={36} weight={TextWeight.heavy}>
              TimTim <Trans>real estate search</Trans>
            </Text>
          </Box>
        ) : (
          <Text color={TextColors.contrast} size={36} mt={'70px'} weight={TextWeight.heavy}>
            TimTim <Trans>real estate search</Trans>
          </Text>
        )}
        <Box p={isMobile ? '15px' : 3} />
        <SearchTypeSwitcher value={searchType} isMobile={isMobile} onChange={handleSearchType} />
        <Box p={3} />
        <SearchBar onApplySearch={onApplySearch} />
      </Box>
      <Hidden mdUp>
        <Box p={1} />
      </Hidden>
      <Hidden mdDown>
        <Box display={'flex'} justifyContent={'center'} position={'relative'} height={620}>
              <img className={classes.homeImage} src={homeBackgroundImage} alt="" />
        </Box>
      </Hidden>

    </div>
  );
}

