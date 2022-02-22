import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  fade,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  withStyles,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {equals} from 'ramda';
import classnames from 'classnames';
import {Trans} from '@lingui/macro';

import DueDateSelector from './DueDateSelector';
import ChipCheckbox from '$app/components/common/chipCheckbox/ChipCheckbox';
import CircleSelector from '$app/components/selectors/CircleSelector';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import useDebounce from '$app/hooks/useDebounce';
import {getResetFilters} from '$app/redux/actions/uiActions';
import {DEFAULT_DUE_DATE_FILTERS} from '$app/redux/const/const';
import Routes from '$app/utlis/routes';
import {roomCounts} from '$js/utils/realty'
import {currencies} from '$js/config'
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.white,
    borderColor: '#D3C18D',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  content: {
    padding: '16px 24px',
    overflowX: 'hidden',
    overflowY: 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.white,
    [theme.breakpoints.down('sm')]: {
      padding: '8px 12px',
    },
  },
  controls: {
    zIndex: 1,
    minHeight: 56,
    boxShadow: '0px -2px 20px -3px rgba(143,128,143,0.89);',
  },
  buttons: {
    margin: theme.spacing(1),
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  clearBtn: {
    padding: '6px 16px',
    minWidth: '64px',
    backgroundColor: theme.palette.primary.white,
    borderRadius: '24px',
    color: theme.palette.primary.main,
    fontSize: '14px',
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.08),
    },
  },
  showBtn: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.white,
    borderRadius: 10,
    textTransform: 'none'
  },
  cancelBtn: {
    textTransform: 'none',
    textDecoration: 'underline'
  },
  row: {
    marginTop: theme.spacing(1),
  },

  filterSection: {
    display: 'flex',
    alignContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 20,
    fontSize: 16,
    color: '#26292F',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  filterLabel: {
    minWidth: 100,
    textAlign: 'left',
    paddingTop: 20,
    paddingBottom: 15,
    color: theme.palette.secondary.main,
    fontSize: 14,
    fontWeight: 500,

    [theme.breakpoints.up('sm')]: {
      paddingBottom: 0,
    },
  },
  filterValues: {
    flexGrow: 1,
  },
  realtyType: {
    backgroundColor: theme.palette.primary.lightGrey,
    borderRadius: 50,
    color: theme.palette.primary.darkGrey,
    fontSize: 13,
    fontWeight: 400,
    cursor: 'pointer',
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 15,
      height: 15,
      marginRight: 10
    }
  },
  realtyTypeSelected: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
  },
}));

export const FilterSection = ({label, children}) => {
  const classes = useStyles();
  return (
    <section className={classes.filterSection}>
      <div className={classes.filterLabel}>{label}</div>
      <div className={classes.filterValues}>{children}</div>
    </section>
  );
};

function NumberFormatCustom(props) {
  const {inputRef, onChange, currency, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      maxLength="11"
      allowNegative={false}
      thousandSeparator=" "
      prefix={currency ? `${currency} ` : ''}
      style={{
        textAlign: 'right',
      }}
    />
  );
}

const ValueInput = withStyles((theme) => ({
  root: {
    border: 'none',
    borderRadius: 8,
    fontSize: 14,

    '& .MuiFilledInput-root': {
      background: 'none'
    },
    '& label': {
      textTransform: 'capitalize',
      fontFamily: 'Montserrat',
      color: theme.palette.primary.darkGrey,
    },
    '& .Mui-focused input': {
      backgroundColor: theme.palette.primary.white,
      border: '1px solid',
      borderColor: theme.palette.primary.main,
    },
    '& input': {
      padding: '17px 12px 14px',
      backgroundColor: theme.palette.primary.lightGrey,
      color: theme.palette.primary.darkGrey,
      borderRadius: 10
    },
  }
}))(TextField);

const priceStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  input: {
    flexGrow: 1,
  },
  spacer: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export const PriceFilter = React.memo((
  {
    from,
    to,
    onCurrencyChange,
    onPriceRangeChange,
    currency,
    isOwner,
    onIsOwnerFilterChange,
    altView,
    ...props
  }) => {
    const classes = priceStyles();
    const [priceMin, setPriceMin] = useState(from);
    const [priceMax, setPriceMax] = useState(to);
    const [priceMaxError, setPriceMaxError] = useState(false);
    const location = useLocation();
    const isAdvSearch =
      location.pathname.includes(Routes.sale) || location.pathname.includes(Routes.rent);

    const debouncedPriceMin = useDebounce(priceMin, 500);
    const debouncedPriceMax = useDebounce(priceMax, 500);

    useEffect(() => {
      let isError = priceMaxError;
      if (!priceMaxError && priceMax && priceMin && priceMin > priceMax) {
        isError = true;
        setPriceMaxError(true);
      } else if (priceMaxError && (!priceMax || !priceMin || priceMin < priceMax)) {
        isError = false;
        setPriceMaxError(false);
      }
      if (!isError) {
        onPriceRangeChange({priceMin, priceMax});
      }
    }, [
      debouncedPriceMax,
      debouncedPriceMin,
      onPriceRangeChange,
      priceMax,
      priceMin,
      priceMaxError,
    ]);

  return (
    <>
      <div className={classes.root} style={altView && {marginBottom: 'unset'}} {...props}>
        <ValueInput
          label={<Trans>from</Trans>}
          variant="filled"
          className={classes.input}
          InputLabelProps={{shrink: false}}
          value={priceMin}
          onChange={(e) => setPriceMin(parseInt(e.target.value) || null)}
          InputProps={{
            disableUnderline: true,
            inputComponent: NumberFormatCustom,
            inputProps: {
              currency: currencies[currency].symbol,
            },
          }}
        />
        <span className={classes.spacer}>-</span>
        <ValueInput
          label={<Trans>to</Trans>}
          value={priceMax}
          variant="filled"
          onChange={(e) => setPriceMax(parseInt(e.target.value) || null)}
          className={classes.input}
          error={priceMaxError}
          InputLabelProps={{shrink: false}}
          InputProps={{
            disableUnderline: true,
            inputComponent: NumberFormatCustom,
            inputProps: {
              currency: currencies[currency].symbol,
            },
          }}
        />
      </div>

      <Grid container spacing={3} alignItems="center">
        {isAdvSearch && (
          <Grid item>
            <ChipCheckbox isSelected={isOwner} onChange={onIsOwnerFilterChange}>
              <Trans>From owner</Trans>
            </ChipCheckbox>
          </Grid>
        )}
        <Grid item>
          <RadioGroup value={currency} onChange={(e) => {
            onCurrencyChange(e.target.value)
          }}>
            <FormGroup row>
              <FormControlLabel
                value={currencies.usd.value}
                control={<Radio/>}
                label={currencies.usd.label}
              />
              <FormControlLabel
                value={currencies.sum.value}
                control={<Radio/>}
                label={currencies.sum.label}
              />
            </FormGroup>
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
  },
);

export const SizeFilter = React.memo(({from, to, onSizeRangeChange}) => {
  const classes = priceStyles();

  const [sizeMin, setSizeMin] = useState(from);
  const [sizeMax, setSizeMax] = useState(to);
  const [sizeMaxError, setSizeMaxError] = useState(false);
  const debouncedSizeMin = useDebounce(sizeMin, 500);
  const debouncedSizeMax = useDebounce(sizeMax, 500);

  useEffect(() => {
    let isError = sizeMaxError;
    if (!sizeMaxError && sizeMax && sizeMin && sizeMin > sizeMax) {
      isError = true;
      setSizeMaxError(true);
    } else if (sizeMaxError && (!sizeMax || !sizeMin || sizeMin < sizeMax)) {
      isError = false;
      setSizeMaxError(false);
    }
    if (!isError) {
      onSizeRangeChange({sizeMin, sizeMax});
    }
  }, [debouncedSizeMax, debouncedSizeMin, onSizeRangeChange, sizeMax, sizeMaxError, sizeMin]);

  return (
    <>
      <div className={classes.root}>
        <ValueInput
          label={<Trans>from</Trans>}
          variant="filled"
          value={sizeMin}
          className={classes.input}
          InputLabelProps={{shrink: false}}
          onChange={(e) => setSizeMin(parseInt(e.target.value) || null)}
          InputProps={{
            disableUnderline: true,
            inputComponent: NumberFormatCustom,
            inputProps: {
              currency: null,
            },
          }}
        />
        <span className={classes.spacer}>-</span>
        <ValueInput
          label={<Trans>to</Trans>}
          variant="filled"
          value={sizeMax}
          onChange={(e) => setSizeMax(parseInt(e.target.value) || null)}
          className={classes.input}
          error={sizeMaxError}
          InputLabelProps={{shrink: false}}
          InputProps={{
            disableUnderline: true,
            inputComponent: NumberFormatCustom,
            inputProps: {
              currency: null,
            },
          }}
        />
      </div>
    </>
  );
});

export const getRoomValues = (rooms, selectedRooms) => {
  return rooms.map((room) => ({
    ...room,
    isSelected: selectedRooms.includes(room.value),
  }));
};

let priceKey;
let sizeKey;
let dueDateKey;
let shouldGeneratePriceKey = true;
let shouldGenerateSizeKey = true;
let shouldGenerateDueDateKey = true;

const FilterPanel = (
  {
    rooms,
    currency,
    isOwner,
    priceMax,
    priceMin,
    sizeMax,
    sizeMin,
    realtyTypes,
    realtyTypesSelected,
    onRoomFilterValueAdded,
    onRoomFilterValueRemoved,
    onCurrencyChange,
    onIsOwnerFilterChange,
    onPriceRangeChange,
    onSizeRangeChange,
    onFilterPanelDisplayChange,
    onDueDateChange,
    onRealtyTypesSelectChange,
    onRealtyTypesReset,
  }) => {
  const styles = useStyles();
  const location = useLocation();
  const dueDate = useSelector((state) => state.filters.dueDate);
  const isRCPage =
    location.pathname === useGetFullRoute(Routes.complexList) ||
    location.pathname.includes('/complex/');

  const dispatch = useDispatch();

  const priceFiltersKey = useMemo(() => {
    if (priceMin !== null || priceMax !== null) {
      shouldGeneratePriceKey = true;
    }
    if (priceMin === null && priceMax === null && shouldGeneratePriceKey) {
      priceKey = String(Math.random() * 1000);
      shouldGeneratePriceKey = false;
    }
    return priceKey;
  }, [priceMin, priceMax]);

  const sizeFiltersKey = useMemo(() => {
    if (sizeMin !== null || sizeMax !== null) {
      shouldGenerateSizeKey = true;
    }
    if (sizeMin === null && sizeMax === null && shouldGenerateSizeKey) {
      sizeKey = String(Math.random() * 1000);
      shouldGenerateSizeKey = false;
    }
    return sizeKey;
  }, [sizeMin, sizeMax]);
  const dueDateFiltersKey = useMemo(() => {
    if (!equals(DEFAULT_DUE_DATE_FILTERS, dueDate)) {
      shouldGenerateDueDateKey = true;
    }
    if (shouldGenerateDueDateKey && equals(DEFAULT_DUE_DATE_FILTERS, dueDate)) {
      dueDateKey = String(Math.random() * 1000);
      shouldGenerateDueDateKey = false;
    }
    return dueDateKey;
  }, [dueDate]);

  const handleApply = () => {
    onFilterPanelDisplayChange(false);
  };

  const handleCancel = () => {
    onFilterPanelDisplayChange(false);
  };

  const clearFilters = useCallback(() => {
    dispatch(getResetFilters());
  }, [dispatch]);

  const roomValues = getRoomValues(roomCounts, rooms);

  return (
    <Card className={styles.root} elevation={4}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <CardHeader title={<Trans>Filters</Trans>}/>
        <Box display={'flex'} alignItems={'center'}>
          <Button
            size={'small'}
            variant="text"
            className={classnames(styles.buttons, styles.clearBtn)}
            onClick={clearFilters}
          >
            <Box m={'0 2px'}>
              <Trans>Clear</Trans>
            </Box>
          </Button>
        </Box>
      </Box>
      <Divider/>
      <CardContent className={styles.content}>
        {isRCPage && (
          <DueDateSelector onChange={onDueDateChange} dueDate={dueDate} key={dueDateFiltersKey}/>
        )}
        <FilterSection label={<Trans>Rooms</Trans>}>
          <CircleSelector
            values={roomValues}
            onSelect={onRoomFilterValueAdded}
            onDeselect={onRoomFilterValueRemoved}
          />
        </FilterSection>
        <FilterSection label={<Trans>Price</Trans>}>
          <PriceFilter
            onPriceRangeChange={onPriceRangeChange}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            isOwner={isOwner}
            from={priceMin}
            to={priceMax}
            onIsOwnerFilterChange={onIsOwnerFilterChange}
            key={priceFiltersKey}
          />
        </FilterSection>
        <FilterSection label={<Trans>Area</Trans>}>
          <SizeFilter
            from={sizeMin}
            to={sizeMax}
            onSizeRangeChange={onSizeRangeChange}
            key={sizeFiltersKey}
          />
        </FilterSection>
        {!isRCPage && (
          <section>
            <Grid className={styles.filterLabel}><Trans>Realty Type</Trans></Grid>
            <Grid container spacing={2} className={styles.row}>
              <Grid item>
                <div
                  onClick={onRealtyTypesReset}
                  className={classnames(styles.realtyType, { [styles.realtyTypeSelected]: realtyTypesSelected.size === 0 })}
                >
                  <Trans>All announcements</Trans>
                </div>
              </Grid>

              {realtyTypes.map((type, index) => (
                  <Grid item key={index}>
                    <div
                      onClick={() => onRealtyTypesSelectChange(type.value)}
                      className={classnames(styles.realtyType, { [styles.realtyTypeSelected]: realtyTypesSelected.has(type.value) })}
                    >
                      <svg data-src={type.icon}/>{type.label}
                    </div>
                  </Grid>
                )
              )}
            </Grid>
          </section>
        )}
      </CardContent>
      <CardActions className={styles.controls}>
        <Fab
          variant="extended"
          aria-label="Add"
          className={classnames(styles.buttons, styles.showBtn)}
          onClick={handleApply}
        >
          <Trans>Show</Trans>
        </Fab>
        <Button className={classnames(styles.buttons, styles.cancelBtn)} onClick={handleCancel}>
          <Trans>Cancel</Trans>
        </Button>
      </CardActions>
    </Card>
  );
};

export default FilterPanel;
