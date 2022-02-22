import React from 'react';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Trans } from '@lingui/macro';

import DeveloperInfo from './DeveloperInfo';
import Text, { TextColors, TextWeight } from '../common/Text';
import CloseIcon from '$app/icons/CloseIcon';

function RCContactPhonePanel({ phoneNumber, RCDeveloper, onClose }) {
  return (
    <Paper elevation={4} style={{ borderRadius: '8px' }}>
      <Box
        p={'0 24px 24px 24px'}
        style={{ position: 'relative' }}
        height={'242px'}
        width={'426px'}
        mt={'40px'}
      >
        <CloseIcon
          style={{
            cursor: 'pointer',
            zIndex: 16,
            position: 'absolute',
            top: '-16px',
            right: '24px',
          }}
          onClick={onClose}
        />
        <Text weight={TextWeight.heavy} size={18} mb={2}>
          {<Trans>Consultant contact info</Trans>}
        </Text>
        <Text size={28}>{phoneNumber}</Text>
        <Box mt={4} mb={3}>
          <Divider />
        </Box>
        <Box>
          <Text weight={TextWeight.semiLight} color={TextColors.secondary}>
            {<Trans>Real estate developer</Trans>}
          </Text>
          <DeveloperInfo developer={RCDeveloper} large altView />
        </Box>
      </Box>
    </Paper>
  );
}

export default RCContactPhonePanel;
