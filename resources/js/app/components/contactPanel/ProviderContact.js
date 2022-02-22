import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ProviderButton from './ProviderButton';
import FormattedPrice from '$app/components/common/formatters/FormattedPrice';
import FormattedDate from '$app/components/common/formatters/FormattedData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    alignItems: 'center',
    marginRight: '4px',
  },
  info: {},
  price: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: -0.15,
    color: theme.palette.secondary.contrastText,
  },
  date: {
    marginTop: 4,
    fontWeight: 300,
    fontSize: 11,
    lineHeight: 1.2,
    letterSpacing: -0.21,
    color: '#54606A',
  },
}));
const ProviderContact = ({ provider, date, price, url, currency }) => {
  const classes = useStyles();
  const currentLanguage = useSelector((state) => state.ui.language);
  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.price}>
          <FormattedPrice price={price} /> {currency}
        </div>
        <div className={classes.date}>
          <FormattedDate date={date} locale={currentLanguage} />
        </div>
      </div>
      <ProviderButton text={provider} url={url} />
    </div>
  );
};

export default ProviderContact;
