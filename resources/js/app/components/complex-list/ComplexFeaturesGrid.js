import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import sortBy from 'ramda/src/sortBy';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import take from 'ramda/src/take';
import {Trans} from '@lingui/macro';

import StyledButton from '../common/StyledButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'center',
    padding: '4px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8px',
  },
  image: {
    width: 56,
    height: 56,
    objectFit: 'scale-down',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  type: {
    display: 'flex',
    alignItems: 'center',
    color: '#54606A',
    fontSize: '12px',
    lineHeight: '20px',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  shortGrid: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  fullGrid: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  showMoreButton: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
    borderRadius: 24,
    padding: '10px 24px'
  }
}));

function DividerWithShowMore({onClick, remainingItemsCount, ...props}) {
  const classes = useStyles();
  return (
    <Box display={'flex'} alignItems={'center'} mt={'48px'} {...props}>
      <Box height={'1px'} style={{backgroundColor: 'rgba(31,34,41, 0.1)'}} flex={1}/>
      <Box p={1}/>
      <Button  onClick={onClick} className={classes.showMoreButton}>
        <Trans>{remainingItemsCount} more</Trans> {'\u25be'}
      </Button>
      <Box p={1}/>
      <Box height={'1px'} style={{backgroundColor: 'rgba(31,34,41, 0.1)'}} flex={1}/>
    </Box>
  );
}

function CharacteristicBlock({title, value, iconUrl, reverseBoldness, noSubheader, ...props}) {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={iconUrl} alt={''}/>
        </div>
        <div className={classes.textContainer}>
          {reverseBoldness ? (
            <>
              <div className={classes.value}>{title}</div>
              {!noSubheader && <div className={classes.type}>{value}</div>}
            </>
          ) : (
            <>
              {!noSubheader && <div className={classes.type}>{title}</div>}
              <div className={classes.value}>{value}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ({properties, short, reverseBoldness, noSubheader}) => {
  const styles = useStyles();

  const [showFirstEightItems, setShowFirstEightItems] = useState(true);
  let itemsToRender = sortBy((item) => item.order)(properties);
  if (short) {
    itemsToRender = take(4)(properties);
  } else {
    if (showFirstEightItems) {
      itemsToRender = take(8)(itemsToRender);
    }
  }
  return (
    <Box>
      <div className={short ? styles.shortGrid : styles.fullGrid}>
        {itemsToRender.map((property, index) => (

          <CharacteristicBlock
            key={index}
            title={property.feature.name}
            value={property.value}
            iconUrl={property.feature.icon}
            reverseBoldness={reverseBoldness}
            noSubheader={noSubheader}
          />
        ))}
      </div>
      {!short && properties.length > 8 && showFirstEightItems && (
        <DividerWithShowMore
          remainingItemsCount={properties.length - 8}
          onClick={() => {
            setShowFirstEightItems(false);
          }}
        />
      )}
    </Box>
  );
}