import React, { useCallback, useMemo, useState } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, Typography, withStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { flatten, groupBy, last, take } from 'ramda';
import pick from 'ramda/src/pick';
import without from 'ramda/src/without';
import { Trans } from '@lingui/macro';
import classnames from 'classnames';

import Text, { TextWeight } from '../common/Text';
import StyledLink from '../common/StyledLink';
import { getPrettyPriceString } from '$app/utlis/common';
import Routes from '$app/utlis/routes';
import useGetFullRoute from '$app/hooks/useGetFullRoute';

const useLayoutRowStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid rgba(31,34,41,0.1)',
    padding: '8px 0',
    cursor: 'pointer',
  },
  image: {
    height: '40px',
    width: '40px',
  },
  centeredContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'unset',
  },
}));

function LayoutPreviewRow({
  layout: { icon, room_num, min_price_uah, min_size_total, max_size_total, available },
  onClick,
  isVerified,
  ...props
}) {
  const styles = useLayoutRowStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  return (
    <div className={classnames(styles.root)} onClick={() => onClick(room_num)} {...props}>
      {isMobile ? (
        <>
          <Box className={styles.centeredContent} style={{ marginBottom: '-5px' }} flex={1}>
            <img src={icon} className={styles.image} alt={''} />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flex={4}>
            <Text size={16}>
              <Trans>{room_num} room(s)</Trans>,{' '}
              <Trans>
                {min_size_total} - {max_size_total} m{'\u00B2'}
              </Trans>
            </Text>
            <Text weight={TextWeight.semiLight}>
              <Trans>from</Trans> {getPrettyPriceString(min_price_uah)}
            </Text>
          </Box>
          <Box className={styles.centeredContent} flex={1}>
            <div style={{ color: '#0092A8' }}>
              <Trans>{available} apt(s).</Trans> {'❯'}
            </div>
          </Box>
        </>
      ) : (
        <>
          <div className={styles.centeredContent} style={{ flex: 1 }}>
            <img src={icon} className={styles.image} alt={''} />
          </div>
          <div
            className={styles.centeredContent}
            style={{ flex: 3, fontSize: '16px', justifyContent: 'start' }}
          >
            <Trans>{room_num} room(s)</Trans>
          </div>
          <div className={styles.centeredContent} style={{ flex: 3, justifyContent: 'start' }}>
            <Trans>from</Trans> {getPrettyPriceString(min_price_uah)}
          </div>
          <div className={styles.centeredContent} style={{ flex: 2 }}>
            <Trans>
              {min_size_total} - {max_size_total} m{'\u00B2'}
            </Trans>
          </div>
          <div className={styles.centeredContent} style={{ flex: 2 }}>
            <div style={{ color: '#0092A8' }}>
              <Trans>{available} apt(s).</Trans> {'❯'}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const QuarterButton = withStyles((theme) => ({
  root: {
    borderRadius: '50px',
    padding: '4px 8px',
    fontWeight: 400,
    fontFamily: 'sans-serif',
    textTransform: 'unset',
    background: (props) =>
      props.active ? theme.palette.secondary.main : theme.palette.primary.buttonBackgroundGrey,
    '&:hover': {
      background: (props) =>
        props.active ? theme.palette.secondary.main : theme.palette.primary.buttonBackgroundGrey,
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '32px 0 24px 0',
  },
  title: {
    padding: '16px 0',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  filters: {
    display: 'flex',
    padding: '16px 0',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: 8,
    },
  },
  layouts: {
    borderTop: '1px solid rgba(31,34,41,0.1)',
    borderColor: 'rgba(31,34,41,0.1)',
  },
  showFilters: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0092A8',
    cursor: 'pointer',
  },
  noLayoutsPreview: {
    background: 'rgba(246,116,116,0.1)',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    marginBottom: '24px',
    alignItems: 'center',
  },
}));

function aggregateLayoutsByRoomsNumber(layouts) {
  const byRoomsNumber = (layout) => String(layout.room_num);
  const layoutsByRoomNumber = groupBy(byRoomsNumber)(flatten(layouts));

  return Object.values(layoutsByRoomNumber).reduce((acc, layoutsWithSameNumberOfRooms) => {
    const aggregatedResult = layoutsWithSameNumberOfRooms.reduce((acc, layout) => {
      const accCopy = { ...acc };
      accCopy.min_size_total = Math.min(acc.min_size_total, layout.min_size_total);
      accCopy.max_size_total = Math.max(acc.max_size_total, layout.max_size_total);
      accCopy.min_price_uah = Math.min(acc.min_price_uah, layout.min_price_uah);
      accCopy.min_price_usd = Math.min(acc.min_price_usd, layout.min_price_usd);
      accCopy.available += layout.available;
      return accCopy;
    });
    acc.push(aggregatedResult);
    return acc;
  }, []);
}

function LayoutsPreview({
  layouts,
  isVerified,
  onLayoutClick,
  onFiltersClick,
  filteredCount,
  complexId,
}) {
  const styles = useStyles();

  const layoutsByQuarter = useMemo(
    () =>
      layouts.reduce((acc, item) => {
        const quarterId = `${item.year}${item.quarter}`; //20203 -> 2020, quarter 3
        acc[quarterId] = Object.values(item.plans);
        return acc;
      }, {}),
    [layouts],
  );

  const allLayouts = useMemo(
    () => aggregateLayoutsByRoomsNumber(Object.values(layoutsByQuarter)),
    [layoutsByQuarter],
  );

  const [selectedQuarters, setSelectedQuarters] = useState([]);

  const layoutsForCurrentRcUrl = useGetFullRoute(Routes.residentialComplexLayouts(complexId));

  const onClickHandler = useCallback(
    (roomsNumber) => {
      onLayoutClick(roomsNumber, selectedQuarters);
    },
    [onLayoutClick, selectedQuarters],
  );

  return (
    <div className={styles.root}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <div className={styles.title}>
          <Typography variant={'h2'}>
            <Trans>Apartments from the developer</Trans>
          </Typography>
        </div>
        {Boolean(filteredCount) && isVerified && (
          <div className={styles.showFilters} onClick={onFiltersClick}>
            <Trans>Show {filteredCount} apartments for your request</Trans>
          </div>
        )}
      </Box>
      <div className={styles.filters}>
        <QuarterButton
          style={{ marginBottom: '8px' }}
          onClick={() => setSelectedQuarters([])}
          active={selectedQuarters.length === 0}
        >
          <Trans>All</Trans>
        </QuarterButton>
        {Object.keys(layoutsByQuarter)
          .sort((a, b) => Number(a) - Number(b))
          .map((quarterId) => (
            <QuarterButton
              key={quarterId}
              style={{ marginBottom: '8px' }}
              active={selectedQuarters.includes(quarterId)}
              onClick={() => {
                if (selectedQuarters.includes(quarterId)) {
                  setSelectedQuarters(without([quarterId], selectedQuarters));
                } else {
                  setSelectedQuarters([quarterId, ...selectedQuarters]);
                }
              }}
            >
              {last(quarterId)} кв. {take(4)(quarterId)}
            </QuarterButton>
          ))}
      </div>
      <div className={styles.layouts}>
        {selectedQuarters.length === 0
          ? allLayouts.map((layout, index) => (
              <StyledLink
                key={index}
                to={layoutsForCurrentRcUrl}
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <LayoutPreviewRow
                  layout={layout}
                  onClick={onClickHandler}
                  isVerified={isVerified}
                />
              </StyledLink>
            ))
          : aggregateLayoutsByRoomsNumber(
              Object.values(pick(selectedQuarters, layoutsByQuarter)),
            ).map((layout, index) => (
              <LayoutPreviewRow
                key={index}
                layout={layout}
                onClick={onClickHandler}
                isVerified={isVerified}
              />
            ))}
      </div>
    </div>
  );
}

export default React.memo(LayoutsPreview);
