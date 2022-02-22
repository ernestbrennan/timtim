import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import {Divider, makeStyles, Typography} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import sortBy from 'ramda/src/sortBy';
import DateTime from 'luxon/src/datetime';
import { Trans } from '@lingui/macro';

import Text, { TextWeight } from '../common/Text';
import Title from '../common/Title';

const usePromotionStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'auto hidden',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      overflow: 'unset',
    },
    '& > *': {
      marginRight: '24px',
      [theme.breakpoints.down('md')]: {
        marginRight: 'unset',
        marginBottom: '8px',
      },
    },
  },
  overflowConcealer: {
    maxHeight: '132px',
    overflowY: 'hidden',
    [theme.breakpoints.down('md')]: {
      maxHeight: 'unset',
      overflow: 'unset',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px',
    background: '#FFE36F',
    borderRadius: '12px',
    minWidth: '307px',
    minHeight: '132px',
  },
  dueDate: {
    opacity: 0.5,
    height: '20px',
  },
}));

function getButtonsStyle(isMobile) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44px',
    width: '44px',
    borderRadius: '50%',
    border: '1px solid #DFE1E5',
    cursor: 'pointer',
  };
}

function RCPromotions({ promotions, isMobile }) {
  const styles = usePromotionStyles();
  const scrollRef = useRef();
  const currentLanguage = useSelector((state) => state.ui.language);

  const onClickLeft = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? -331 : -944,
      behavior: 'smooth',
    });
  }, [isMobile]);
  const onClickRight = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? 331 : 944,
      behavior: 'smooth',
    });
  }, [isMobile]);

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Title>
          <Typography variant={'h2'}>
            <Trans>Discounts and promotions</Trans>
          </Typography>
        </Title>
        <Box display={'flex'} alignItems={'center'}>
          <Box style={getButtonsStyle(isMobile)} onClick={onClickLeft} mr={2}>
            <KeyboardArrowLeft />
          </Box>
          <Box style={getButtonsStyle(isMobile)} onClick={onClickRight}>
            <KeyboardArrowRight />
          </Box>
        </Box>
      </Box>
      <Box className={styles.overflowConcealer}>
        <Box className={styles.root} ref={scrollRef}>
          {sortBy((item) => item.order)(promotions).map((item, key) => (
            <Box className={styles.item} key={key}>
              <Text weight={TextWeight.heavy}>{item.description}</Text>
              {item.due_date && (
                <Text className={styles.dueDate}>
                  до {DateTime.fromISO(item.due_date).setLocale(currentLanguage).toFormat('d MMMM')}
                </Text>
              )}
            </Box>
          ))}
          <Divider />
        </Box>
      </Box>
    </Box>
  );
}

export default RCPromotions;
