import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 328,
    borderRadius: 16,
    paddingTop: 27,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
}));
const ContactPanel = ({ className, children, ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classNames(classes.root, className)} {...props}>
      {children}
    </Paper>
  );
};

export default ContactPanel;
