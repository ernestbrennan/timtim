import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import { Trans } from '@lingui/macro';

const StyledTabs = withStyles({
  root: {
    color: '#fff',
  },
  indicator: {
    background: '#fff',
    opacity: 1,
    height: '2px',
  },
})(Tabs);

const StyledTab = withStyles({
  root: {
    opacity: 0.8,
    fontSize: '18px',
    color: '#fff!important',
    textTransform: 'unset!important',
    padding: '8px 0',
    margin: '0 16px',
    '&:active': {},
  },
  selected: {
    opacity: 1,
  },
})(Tab);

const tabLabels = {
  mobile: [<Trans>to rent</Trans>, <Trans>Buy</Trans>, <Trans>New buildings</Trans>],
  desktop: [
    <Trans>Rent an apartment</Trans>,
    <Trans>Buy an apartment</Trans>,
    <Trans>Apartment in a new building</Trans>,
  ],
};

function SearchTypeSwitcher({ value, onChange, isMobile }) {
  return (
    <Box>
      <StyledTabs
        value={value}
        onChange={onChange}
        centered={!isMobile}
        indicatorColor="primary"
        textColor="primary"
        variant={isMobile ? 'scrollable' : undefined}
        scrollButtons="auto"
      >
        {tabLabels[isMobile ? 'mobile' : 'desktop'].map((item, index) => (
          <StyledTab key={index} disableRipple label={item} />
        ))}
      </StyledTabs>
    </Box>
  );
}

export default SearchTypeSwitcher;
