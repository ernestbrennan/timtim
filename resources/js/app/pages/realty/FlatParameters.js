import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import { getProperties, getSizeText } from '$app/utlis/realty';

import sizeKitchen from '$app/assets/svg/realty-parameters/sizeKitchen.svg'
import sizeLiving from '$app/assets/svg/realty-parameters/sizeLiving.svg'
import sizeTotal from '$app/assets/svg/realty-parameters/sizeTotal.svg'
import bathroomType from '$app/assets/svg/realty-parameters/bathroomType.svg'
import layoutType from '$app/assets/svg/realty-parameters/layoutType.svg'
import conditionType from '$app/assets/svg/realty-parameters/conditionType.svg'
import furnitureType from '$app/assets/svg/realty-parameters/furnitureType.svg'
import buildingType from '$app/assets/svg/realty-parameters/buildingType.svg'
import wallType from '$app/assets/svg/realty-parameters/wallType.svg'
import heatingType from '$app/assets/svg/realty-parameters/heatingType.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    flexDirection: 'row',
    '@media (max-width: 700px)': {
      flexDirection: 'column',
    },
  },
  column: {
    flex: 1
  },
  item: {
    display: 'flex',
    paddingBottom: 10,
    minWidth: 120,
  },
  label: {
    color: '#5F5F5F',
    width: 150
  },
  dots: {
    width: 40,
    borderBottom: '2px dotted #54606A',
    marginRight: 15,
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'lowercase',
    color: '#848484'
  },
}));

export default ({realty}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div className={classes.column}>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={sizeTotal} alt=""/> Общая
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={sizeLiving} alt=""/> Жилая
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_living)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={sizeKitchen} alt=""/> Кухня
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_kitchen)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={layoutType} alt=""/> Планировка
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_kitchen)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={bathroomType} alt=""/> Санузел
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_kitchen)}
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={heatingType} alt=""/> Отопление
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={wallType} alt=""/> Тип стен
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={buildingType} alt=""/> Тип дома
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={conditionType} alt=""/> Ремонт
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>
            <img src={furnitureType} alt=""/> Мебель
          </div>
          <div className={classes.value}>
            <div className={classes.dots}/> {getSizeText(realty.size_total)}
          </div>
        </div>
      </div>

    </div>
  );
};
