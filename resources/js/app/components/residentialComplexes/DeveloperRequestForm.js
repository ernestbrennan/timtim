import React, { useCallback, useMemo, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import parsePhoneNumber from 'libphonenumber-js/max';
import { t, Trans } from '@lingui/macro';

import TagCloud from './TagCloud';
import ShortRCInfo from './ShortRCInfo';
import StyledButton from '../common/StyledButton';
import CloseIcon from '$app/icons/CloseIcon';
import LeadTypes from '$app/dto/LeadTypes';
import { formatToCurrencyPrice } from '$app/utlis/price';

function ShortLayoutInfo({ layout }) {
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
      <Box display={'flex'} height={88} width={88} flexDirection={'column'}>
        <img src={layout.images[0]} style={{ height: 88, width: 88 }} alt={''} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} ml={'16px'}>
        <Box color={'primary.lightText'}>
          {layout.complex_name}, <Trans>Completed in</Trans>
          <Trans>
            {layout.quarter} q. {layout.year}
          </Trans>
        </Box>
        <b>{formatToCurrencyPrice(layout.max_price_uah)}</b>
        <b>
          <Trans>{layout.rooms_num} r</Trans> •{' '}
          <Trans>
            {layout.size_total} м{'\u00B2'}
          </Trans>
        </b>
        <Box color={'primary.lightText'}>{formatToCurrencyPrice(layout.max_price_uah)}</Box>
      </Box>
    </Box>
  );
}

function getTagsForObjectType(type) {
  switch (type) {
    case 'complex': {
      return [
        {
          id: 'one_room',
          name: '1' + t`r`,
        },
        {
          id: 'two_rooms',
          name: '2' + t`r`,
        },
        {
          id: 'three_rooms',
          name: '3' + t`r`,
        },
        {
          id: 'four_rooms',
          name: '4' + t`r`,
        },
        {
          id: 'five_and_more',
          name: '5+ ' + t`r`,
        },
        {
          id: 'stocks_and_discounts',
          name: <Trans>Promotions and discounts</Trans>,
        },
        {
          id: 'installment_payments',
          name: <Trans>Installment</Trans>,
        },
        {
          id: 'credit',
          name: <Trans>Credit</Trans>,
        },
        {
          id: 'check_availability',
          name: <Trans>Check availability</Trans>,
        },
      ];
    }
    case 'layout': {
      return [
        {
          id: 'installment_payments',
          name: <Trans>Installment</Trans>,
        },
        {
          id: 'credit',
          name: <Trans>Credit</Trans>,
        },
        {
          id: 'check_availability',
          name: <Trans>Check availability</Trans>,
        },
      ];
    }
    default: {
      throw new Error(`Unknown residential complex object type "${type}"`);
    }
  }
}

const REQUIRED_FIELDS_ARE_EMPTY_ERROR = <Trans>Enter a phone number or an email address</Trans>;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '48px',
    maxHeight: '100%',
    overflowY: 'auto',
    background: '#fff',
    borderRadius: '16px',
    maxWidth: '580px',
  },
  objectPreview: {},
  button: {
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(1, 114, 130)',
    },
  },
}));

function DeveloperRequestForm({ object, type, startingTags = [], onSubmit, onClose, isMobile }) {
  const styles = useStyles();
  const [selectedTags, setSelectedTags] = useState(new Set(startingTags.map((item) => item.id)));
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
      setErrors((errors) => ({
        ...errors,
        phone: <Trans>Incorrect phone number</Trans>,
      }));
    }
    setPhoneNumber(event.target.value);
  }, []);
  const onEmailChange = useCallback((event) => {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(event.target.value).toLowerCase());
    if (isValidEmail) {
      setErrors((errors) => ({ ...errors, email: undefined }));
    } else {
      setErrors((errors) => ({
        ...errors,
        email: <Trans>Incorrect email</Trans>,
      }));
    }
    setEmail(event.target.value);
  }, []);

  const tags = useMemo(() => getTagsForObjectType(type), [type]);
  const onSendButtonClick = () => {
    if (!name || !(phoneNumber || email)) {
      if (!name) {
        setErrors((errors) => ({
          ...errors,
          name: <Trans>Enter your name</Trans>,
        }));
      }
      if (!phoneNumber && !email) {
        setErrors((errors) => ({
          ...errors,
          phone: REQUIRED_FIELDS_ARE_EMPTY_ERROR,
          email: REQUIRED_FIELDS_ARE_EMPTY_ERROR,
        }));
        setTimeout(() => {
          setErrors((errors) => {
            const phoneError =
              errors.phone === REQUIRED_FIELDS_ARE_EMPTY_ERROR ? undefined : errors.phone;
            const emailError =
              errors.email === REQUIRED_FIELDS_ARE_EMPTY_ERROR ? undefined : errors.email;
            return { ...errors, phone: phoneError, email: emailError };
          });
        }, 1000);
      }
      return;
    }

    if (!(errors.name || errors.phone || errors.email)) {
      onSubmit({
        name: name,
        email: email,
        phone: phoneNumber,
        question: question,
        tags: Array.from(selectedTags),
        layout_id: type === 'layout' ? object.id : undefined,
        lead_type: LeadTypes.FILLFORM,
      });
    }
  };

  return (
    <div
      className={styles.root}
      style={isMobile ? { padding: '32px 32px 8px 32px', borderRadius: '8px' } : undefined}
    >
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        {type === 'complex' ? (
          <ShortRCInfo complex={object} />
        ) : (
          <ShortLayoutInfo layout={object} />
        )}
        <CloseIcon
          style={{
            cursor: 'pointer',
            zIndex: 16,
            position: 'relative',
            top: '-24px',
            right: '-24px',
          }}
          onClick={onClose}
        />
      </Box>
      <h3 style={isMobile ? { margin: '8px 0' } : undefined}>
        <Trans>What are you interested in?</Trans>
      </h3>
      <Box>
        <TagCloud tags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />
      </Box>
      <Box display={'flex'} flexDirection={'column'}>
        <form autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="question"
            multiline
            rowsMax={5}
            label={<Trans>Question to the consultant</Trans>}
            onChange={(event) => setQuestion(event.target.value)}
            value={question}
          />
          <TextField
            id="name"
            label={<Trans>Name</Trans>}
            required
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={onNameChange}
            value={name}
          />
          <TextField
            id="email"
            label="E-mail"
            type={'email'}
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={onEmailChange}
            value={email}
          />
          <TextField
            id="phone-number"
            label={<Trans>Phone number</Trans>}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            type={'phone'}
            onChange={onPhoneChange}
            value={phoneNumber}
          />
        </form>
      </Box>
      <Box mt={isMobile ? '8px' : '48px'} width={'100%'}>
        <StyledButton className={styles.button} altColor onClick={onSendButtonClick}>
          <Trans>Send</Trans>
        </StyledButton>
      </Box>
    </div>
  );
}

export default DeveloperRequestForm;
