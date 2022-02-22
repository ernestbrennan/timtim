import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import notFound from "@app/img/notFound.png";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: '20%',
  },
  mainText: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
    fontSize: 20,
  },
  subText: {
    margin: theme.spacing(1),
    fontSize: 14,
  },
}));
const NoSearchResults = ({ props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      <img src={notFound} alt=""/>
      <div className={classes.mainText}>
        <Trans>Oops! No results</Trans>
      </div>
      <div className={classes.subText}>
        <Trans>Try changing filters</Trans>
      </div>
    </div>
  );
};

export default NoSearchResults;
