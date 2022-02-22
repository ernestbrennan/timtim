import React from "react";
import { ToggleButton as ParentToggleButton } from '@material-ui/lab'
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";

import styles from "$admin/assets/jss/components/toggleButtonStyle";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

const ToggleButton = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    value,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <ParentToggleButton {...rest} value={value || 'default'} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </ParentToggleButton>
  );
});

ToggleButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent",
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node,
};

export default ToggleButton
