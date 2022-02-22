import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ProviderContact from './ProviderContact';
import { getPrice } from '$app/utlis/price';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    maxHeight: 159,
    overflow: 'auto',
  },
}));
const ProvidersList = ({ providers, advType }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {providers.map((data, index) => {
        const { price, currency } = getPrice(advType, data);
        return (
          <ProviderContact
            onClick={onClick}
            key={index}
            provider={data.provider}
            url={data.url}
            date={data.created_at}
            price={price}
            currency={currency}
          />
        );
      })}
    </div>
  );
};

export default ProvidersList;
