import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import clsx from 'clsx';

const useCircleStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.lightGrey,
    width: 44,
    height: 44,
    borderRadius: '50%',
    color: theme.palette.primary.gray,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.white,
  },
}));

const useSelectorStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const CircleLabel = ({ value, label, onChange, isSelected = false, altView }) => {
  const classes = useCircleStyle();
  return (
    <div
      onClick={onChange}
      className={clsx(classes.root, { [classes.selected]: isSelected })}
      style={altView ? { borderRadius: '16px', height: '32px' } : undefined}
    >
      {label}
    </div>
  );
};

CircleLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  isSelected: PropTypes.bool,
};

const CircleSelector = ({ values, onSelect, onDeselect, altView, ...props }) => {
  const classes = useSelectorStyle();

  return (
    <div className={classes.root} {...props}>
      {values.map((v, index) => {
        return (
          <CircleLabel
            key={index}
            label={v.label}
            value={v.value}
            isSelected={v.isSelected}
            onChange={() => (v.isSelected ? onDeselect(v.value) : onSelect(v.value))}
            altView={altView}
          />
        );
      })}
    </div>
  );
};

CircleSelector.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

export default CircleSelector;
