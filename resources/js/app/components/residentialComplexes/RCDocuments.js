import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import {makeStyles, Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import sortBy from 'ramda/src/sortBy';
import DateTime from 'luxon/src/datetime';
import { Trans } from '@lingui/macro';

import Text from '../common/Text';
import Title from '../common/Title';
import { ReactComponent as DocumentsIcon } from '$app/icons/DocumentsIcon.svg';

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

const useDocumentsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'auto hidden',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      overflow: 'unset',
    },
    '& > *': {
      marginRight: '16px',
      [theme.breakpoints.down('md')]: {
        marginRight: 'unset',
        marginBottom: '8px',
      },
    },
  },
  overflowConcealer: {
    maxHeight: '92px',
    overflowY: 'hidden',
    [theme.breakpoints.down('md')]: {
      maxHeight: 'unset',
      overflow: 'unset',
    },
  },
  item: {
    minWidth: '318px',
    minHeight: '92px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0, 0.1)',
    padding: '24px 16px',
    cursor: 'pointer',
  },
}));

function RCDocuments({ documents, isMobile }) {
  const styles = useDocumentsStyles();
  const scrollRef = useRef();
  const currentLanguage = useSelector((state) => state.ui.language);

  const onClickLeft = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? -334 : -1012,
      behavior: 'smooth',
    });
  }, [isMobile]);
  const onClickRight = useCallback(() => {
    scrollRef.current.scrollBy({
      left: isMobile ? 334 : 1012,
      behavior: 'smooth',
    });
  }, [isMobile]);

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Title>
          <Typography variant={'h3'}>
            <Trans>Documents</Trans>
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
          {sortBy((item) => item.order)(documents).map((item) => (
            <Box
              display={'flex'}
              className={styles.item}
              onClick={() => {
                window.open(item.url, '_blank');
              }}
            >
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mr={2}>
                <DocumentsIcon />
              </Box>
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>{item.title}</Text>
                {item.date && (
                  <Text>
                    {DateTime.fromISO(item.date).setLocale(currentLanguage).toFormat('d MMMM')}
                  </Text>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default RCDocuments;
