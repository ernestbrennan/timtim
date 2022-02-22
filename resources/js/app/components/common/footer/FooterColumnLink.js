import React from 'react';
import { makeStyles } from '@material-ui/core';

import FooterLink from './FooterLink';
import useHover from '$app/hooks/useHover';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(2),
  },
  iconContainer: {
    paddingRight: 14,
  },
  text: {
    // paddingLeft: 14,
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.secondary.contrastText,
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 300,
    textDecoration: 'none',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const FooterColumnLink = ({ name, link, Icon, IconHover }) => {
  const classes = useStyles();
  const [hoverRef, isHovered] = useHover();

  return (
    <div className={classes.root} ref={hoverRef}>
      <FooterLink to={link} className={classes.link}>
        {Icon && (
          <div className={classes.iconContainer}>
            {isHovered && IconHover ? <IconHover /> : <Icon />}
          </div>
        )}
        <div className={classes.text}>{name}</div>
      </FooterLink>
    </div>
  );
};

export default FooterColumnLink;
