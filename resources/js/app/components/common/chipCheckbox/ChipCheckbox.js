import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.lightGrey,
    borderRadius: 50,
    color: theme.palette.primary.darkGrey,
    fontSize: 13,
    fontWeight: 400,
    cursor: 'pointer',
    padding: '8px 20px',
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.white,
  },
}));

const ChipCheckbox = ({ children, onChange, isSelected = false }) => {
  const classes = useStyle();
  return (
    <div onClick={onChange} className={clsx(classes.root, { [classes.selected]: isSelected })}>
      {children}
    </div>
  );
};

ChipCheckbox.propTypes = {
  isSelected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ChipCheckbox;
