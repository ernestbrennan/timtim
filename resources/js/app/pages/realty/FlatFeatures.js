import React, {useEffect, useMemo, useState} from 'react';
import {Divider, makeStyles} from '@material-ui/core';
import {Trans} from "@lingui/macro";

const useFeatureStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
  },
  image: {
    width: 24,
    height: 24,
    objectFit: 'fill',
  },
  icon: {
    color: '#929292',
    width: 25,
    height: 25
  },
  text: {
    paddingLeft: 12,
    textTransform: 'lowercase',
    maxWidth: 240,
    width: 240,
  },
}));

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    marginTop: theme.spacing(3),
  },
  title: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.5,
    color: '#5F5F5F',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const FlatFeature = ({name, icon}) => {
  const classes = useFeatureStyle();
  return (
    <div className={classes.root}>
      <svg data-src={icon} className={classes.icon}/>
      <div className={classes.text}>{name}</div>
    </div>
  );
};


const FlatFeatures = ({features, featureIds}) => {

  const classes = useStyle();

  const [householdAppliances, setHouseholdAppliances] = useState([])
  const [facilities, setFacilities] = useState([])

  useEffect(() => {
    setHouseholdAppliances(features.filter((f) => f.category_slug === 'household_appliances' && featureIds.includes(f.id)))
    setFacilities(features.filter((f) => f.category_slug === 'facilities' && featureIds.includes(f.id)))
  }, [features, featureIds])

  return (
    <>
      {householdAppliances.length !== 0 && (
        <>
          <Divider className={classes.divider}/>
          <div className={classes.title}>
            <Trans>Household Appliances</Trans>
          </div>

          <div className={classes.root}>
            {householdAppliances.map((feature, index) => {
              return <FlatFeature key={index} name={feature.name} icon={feature.icon}/>;
            })}
          </div>
        </>
      )}
      {facilities.length !== 0 && (
        <>
          <Divider className={classes.divider}/>
          <div className={classes.title}>
            <Trans>Amenities</Trans>
          </div>

          <div className={classes.root}>
            {facilities.map((feature, index) => {
              return <FlatFeature key={index} name={feature.name} icon={feature.icon}/>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default FlatFeatures;
