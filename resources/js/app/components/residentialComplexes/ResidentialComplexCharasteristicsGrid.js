import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import sortBy from 'ramda/src/sortBy';
import Box from '@material-ui/core/Box';
import take from 'ramda/src/take';
import {Trans} from '@lingui/macro';

import StyledButton from '../common/StyledButton';

const useStyles = makeStyles((theme) => ({
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
}));

const useCharacteristicBlockStyles = makeStyles(() => ({
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
    fontFamily: 'Roboto',
    color: '#54606A',
    fontSize: '12px',
    lineHeight: '20px',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
  },
}));

function DividerWithShowMore({onClick, remainingItemsCount, ...props}) {
  return (
    <Box display={'flex'} alignItems={'center'} mt={'48px'} {...props}>
      <Box height={'1px'} style={{backgroundColor: 'rgba(31,34,41, 0.1)'}} flex={1}/>
      <Box p={1}/>
      <StyledButton onClick={onClick}>
        <Trans>{remainingItemsCount} more</Trans> {'\u25be'}
      </StyledButton>
      <Box p={1}/>
      <Box height={'1px'} style={{backgroundColor: 'rgba(31,34,41, 0.1)'}} flex={1}/>
    </Box>
  );
}

function CharacteristicBlock({title, value, iconUrl, reverseBoldness, noSubheader, ...props}) {
  const styles = useCharacteristicBlockStyles();
  return (
    <div className={styles.root} {...props}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={iconUrl} alt={''}/>
        </div>
        <div className={styles.textContainer}>
          {reverseBoldness ? (
            <>
              <div className={styles.value}>{title}</div>
              {!noSubheader && <div className={styles.type}>{value}</div>}
            </>
          ) : (
            <>
              {!noSubheader && <div className={styles.type}>{title}</div>}
              <div className={styles.value}>{value}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function findResidentialComplexKeyProperties(properties) {
  const keyProperties = {
    complex_class: 'complexClass',
    house_count: 'houseCount',
    number_of_storeys: 'numberOfStoreys',
    construction_technology: 'constructionTechnology',
  };

  return properties.reduce((acc, item) => {
    if (keyProperties[item.type]) {
      acc.push(item);
      return acc;
    }
    return acc;
  }, []);
}

export default ({properties, short, reverseBoldness, noSubheader,}) => {
  const styles = useStyles();

  const [showFirstEightItems, setShowFirstEightItems] = useState(true);
  let itemsToRender = sortBy((item) => item.order)(properties);
  if (short) {
    itemsToRender = findResidentialComplexKeyProperties(properties);
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
            title={property.title}
            value={Array.isArray(property.value) ? property.value.join(', ') : property.value}
            iconUrl={property.icon}
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