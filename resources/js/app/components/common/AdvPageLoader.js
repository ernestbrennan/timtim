import React from 'react';
import Box from '@material-ui/core/Box';
import { Trans } from '@lingui/macro';
import LoaderWithLogo from './LoaderWithLogo';
import Text from './Text';

function AdvPageLoader() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      width={'100%'}
    >
      <Box>
        <LoaderWithLogo />
        <Text size={16}>
          <Trans>Loading</Trans>
        </Text>
      </Box>
    </Box>
  );
}

export default AdvPageLoader;
