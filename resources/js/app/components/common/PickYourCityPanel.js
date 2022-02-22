import Box from '@material-ui/core/Box';
import React from 'react';
import Text from './Text';
import StyledButton from './StyledButton';
import Paper from '@material-ui/core/Paper';
import { Trans } from '@lingui/macro';

function PickYourCityPanel({ onConfirm, onChangeCity, ...props }) {
  return (
    <Box style={{ position: 'relative' }} {...props}>
      <Box
        height={'10px'}
        display={'flex'}
        justifyContent={'center'}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div
          style={{
            height: '20px',
            width: '20px',
            transform: 'rotate(45deg)',
            borderRadius: 'unset',
            boxHeight: '-1px -1px 1px -1px rgba(0,0,0,0.2)',
            background: '#fff',
          }}
        />
      </Box>
      <Paper
        style={{
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 1,
        }}
        elevation={4}
      >
        <Text size={18} mb={'20px'}>
          <Trans>Is your city Kiev?</Trans>
        </Text>
        <Box display={'flex'} justifyContent={'space-between'}>
          <StyledButton
            style={{
              height: '36px',
              borderRadius: '32px',
              padding: '8px 16px',
              background: '#FFE36F',
              marginRight: '8px',
            }}
            onClick={onConfirm}
          >
            <Trans>Yes, thanks</Trans>
          </StyledButton>
          <StyledButton
            style={{
              height: '36px',
              borderRadius: '32px',
              padding: '8px 16px',
              background: '#fff',
              border: '1px solid #C9CDD1',
            }}
            onClick={onChangeCity}
          >
            <Trans>No, another</Trans>
          </StyledButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default PickYourCityPanel;
