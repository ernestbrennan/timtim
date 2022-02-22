import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import parsePhoneNumber from 'libphonenumber-js/max';
import { makeStyles } from '@material-ui/core';
import { t, Trans } from '@lingui/macro';

import ShortRCInfo from './ShortRCInfo';
import Text, { TextWeight } from '../common/Text';
import StyledButton from '../common/StyledButton';
import CloseIcon from '$app/icons/CloseIcon';
import LeadTypes from '$app/dto/LeadTypes';

const REQUIRED_FIELDS_ARE_EMPTY_ERROR = t`Enter phone number`;

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(1, 114, 130)',
    },
  },
}));

function RCCallbackForm({ onSubmit, onClose, RC, isMobile }) {
  const styles = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const onNameChange = useCallback(
    (event) => {
      setName(event.target.value);
      setErrors((errors) => ({ ...errors, name: undefined }));
    },
    [setName],
  );

  const onPhoneChange = useCallback((event) => {
    const parsedPhoneNumber = parsePhoneNumber(event.target.value, 'UA');
    if (parsedPhoneNumber && event.target.value.length >= 6 && parsedPhoneNumber?.isValid()) {
      setErrors((errors) => ({ ...errors, phone: undefined }));
    } else {
      setErrors((errors) => ({ ...errors, phone: t`Wrong phone number` }));
    }
    setPhone(event.target.value);
  }, []);

  const onSendButtonClick = () => {
    if (!name || !phone) {
      if (!name) {
        setErrors((errors) => ({ ...errors, name: t`Enter your name` }));
      }
      if (!phone) {
        setErrors((errors) => ({
          ...errors,
          phone: REQUIRED_FIELDS_ARE_EMPTY_ERROR,
        }));
        setTimeout(() => {
          setErrors((errors) => {
            const phoneError =
              errors.phone === REQUIRED_FIELDS_ARE_EMPTY_ERROR ? undefined : errors.phone;
            return { ...errors, phone: phoneError };
          });
        }, 1000);
      }
      return;
    }

    if (!(errors.name || errors.phone)) {
      onSubmit({
        name: name,
        phone: phone,
        lead_type: LeadTypes.CALLBACK,
      });
    }
  };

  return (
    <Paper elevation={4} style={{ borderRadius: '8px' }}>
      <Box
        p={'0 48px 48px 48px'}
        style={{ position: 'relative' }}
        mt={'48px'}
        width={isMobile ? '100%' : '580px'}
      >
        <CloseIcon
          style={{
            cursor: 'pointer',
            zIndex: 16,
            position: 'absolute',
            top: '-24px',
            right: '24px',
          }}
          onClick={onClose}
        />
        <ShortRCInfo complex={RC} />
        <Text size={18} m={'24px 0'} weight={TextWeight.heavy}>
          <Trans>Request a callback</Trans>
        </Text>
        <Box mb={2}>
          <TextField
            id="name"
            label={<Trans>Name</Trans>}
            error={Boolean(errors.name)}
            helperText={errors.name}
            value={name}
            onChange={onNameChange}
            fullWidth
          />
        </Box>
        <Box mb={6}>
          <TextField
            id="phone"
            label={<Trans>Phone number</Trans>}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            onChange={onPhoneChange}
            fullWidth
          />
        </Box>
        <StyledButton className={styles.button} altColor onClick={onSendButtonClick}>
          {<Trans>Send</Trans>}
        </StyledButton>
      </Box>
    </Paper>
  );
}

export default RCCallbackForm;
