import React from 'react';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

function LayoutsPagination({ count, limits, onLimitsChange }) {
  if (!count || count <= 20) {
    return null;
  }
  const buttonsQuantity = Math.ceil(count / 20);
  return (
    <Box p={'32px'} display={'flex'} flexDirection={'row'}>
      <IconButton m={'8px'} variant={'outlined'}>
        <ArrowLeft />
      </IconButton>
      {Array(buttonsQuantity)
        .fill(1)
        .map((index) => (
          <IconButton
            style={{
              backgroundColor: limits.offset / 20 === index + 1 ? '#02A3BB' : '',
            }}
            m={'8px'}
            variant={'outlined'}
            onClick={() => {
              onLimitsChange({ offset: index * 20, limit: 20 });
            }}
          >
            <b>{index + 1}</b>
          </IconButton>
        ))}
      <IconButton m={'8px'} variant={'outlined'}>
        <ArrowRight />
      </IconButton>
    </Box>
  );
}

export default LayoutsPagination;
