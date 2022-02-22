import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';
import { currencies } from '$js/config';
import MoreFiltersIcon from '$app/icons/MoreFiltersIcon';

const useStyles = makeStyles((theme) => ({
  filterTitle: {
    fontSize: 14,
    margin: '8px 12px 0',
    paddingBottom: 3,
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontWeight: 700,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      minHeight: '41px',
    }
  },
  filterIcon: {
    paddingTop: 3,
    paddingRight: 6,
  },
  filterBar: {
    display: 'flex',
  },
}));

const FilterHeader = ({ Icon, children, onChange }) => {
  const classes = useStyles();
  return (
    <div onClick={onChange} className={classes.filterTitle}>
      {Icon && (
        <div className={classes.filterIcon}>
          <Icon />
        </div>
      )}
      {children}
    </div>
  );
};

const FiltersBar = React.memo(({ onFilterPanelDisplayChange, priceMin, priceMax, currency, rooms }) => {
    const classes = useStyles();
    const filterClick = () => {
      onFilterPanelDisplayChange(true);
    };

    const getRooms = (rooms) => {
      return rooms.length ? (
        <Trans>{[...rooms].sort().join(', ')} r</Trans>
      ) : (
        <Trans>Number of rooms</Trans>
      );
    };
    const getPrice = (priceMin, priceMax, currency) => {
      if (priceMin && priceMax) {
        return (
          <Trans>
            from {priceMin} - to {priceMax} {currencies[currency].label.toLowerCase()}
          </Trans>
        );
      } else if (priceMin) {
        return (
          <Trans>
            from {priceMin} {currencies[currency].label.toLowerCase()}
          </Trans>
        );
      } else if (priceMax) {
        return (
          <Trans>
            to {priceMax} {currencies[currency].label.toLowerCase()}
          </Trans>
        );
      }
      return <Trans>Apartment price</Trans>;
    };
    return (
      <div className={classes.filterBar}>
        <FilterHeader onChange={filterClick}>{getRooms(rooms)}</FilterHeader>
        <FilterHeader onChange={filterClick}>{getPrice(priceMin, priceMax, currency)}</FilterHeader>
        <FilterHeader Icon={MoreFiltersIcon} onChange={filterClick}>
          <Trans>Other filters</Trans>
        </FilterHeader>
      </div>
    );
  },
);

export default FiltersBar;
