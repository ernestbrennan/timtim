import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import SubwayBranchMarker from './SubwayIcon';
import PedestrianIcon from '$app/icons/PedestrianIcon';

const useStyles = makeStyles(() => ({
  subwayDistance: {
    display: 'flex',
    alignItems: 'center',
  },
  pedestrianIcon: {
    paddingRight: 4,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
    '&:active': {
      color: '#000',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    marginRight: 3
  },
}));

function NearestSubwayStation({ nearestSubway, advType, asLink = false }) {
  const classes= useStyles();
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentCity = useSelector((state) => state.cities.currentCity);
  const link = `/${currentLanguage}/${currentCity.slug_seo}/${advType}/metro-${nearestSubway.slug_seo}/`;
  return (
    <div className={classes.subwayDistance}>
      {asLink ? (
        <Link to={link} href={link} className={classes.link}>
          <SubwayBranchMarker className={classes.icon} branchColor={nearestSubway.lineColor} />{' '}
          {nearestSubway.name}
        </Link>
      ) : (
        <>
          <SubwayBranchMarker className={classes.icon} branchColor={nearestSubway.lineColor} />{' '}
          {nearestSubway.name}
        </>
      )}
            {'\u00A0\u00A0·\u00A0\u00A0'}
      <div className={classes.pedestrianIcon}>
        <PedestrianIcon />
      </div>
      {'\u00A0'}
      <Trans>{Math.max(nearestSubway.minutes, 1)} min.</Trans>
    </div>
  );
}

export default NearestSubwayStation;
