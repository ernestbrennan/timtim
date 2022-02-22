import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormattedPrice from '$app/components/common/formatters/FormattedPrice';

const useStyles = makeStyles((theme) => ({
  price: {
    fontWeigth: 700,
    fontSize: 28,
    lineHeight: 1.1,
    fontWeight: 900,
    letterSpacing: 0.38,
    display: 'flex',
    alignItems: 'flex-end',
  },
  priceCurrency: {
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 2,
  },
}));
const PriceField = ({ price, currency }) => {
  const classes = useStyles();
  return (
    <div className={classes.price}>
      <div>
        <FormattedPrice price={price} />
      </div>
      <div className={classes.priceCurrency}>{currency}</div>
    </div>
  );
};

export default PriceField;
