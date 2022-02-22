import React from 'react';
import { Box } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import { formatToCurrencyPrice } from '$app/utlis/price';

function ShortRCInfo({ complex }) {
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
      <Box height={88} width={88} display={'flex'}>
        <img src={complex.images[0]} alt={''} style={{ height: 88, width: 88, borderRadius: 8 }} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} ml={'16px'}>
        <div>
          <b>{complex.name}</b>
        </div>
        <div>
          <Trans>Completed in</Trans>{' '}
          <Trans>
            {complex.completionQuarter} q. {complex.completionYear}
          </Trans>
        </div>
        <div>
          <Trans>from</Trans> {formatToCurrencyPrice(complex.minimalPriceUah)}
          <Trans>/m{'\u00B2'}</Trans>
        </div>
      </Box>
    </Box>
  );
}

export default ShortRCInfo;
