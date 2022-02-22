import React from 'react';
import { makeStyles } from '@material-ui/core';
import FooterColumnLink from './FooterColumnLink';
import FooterColumnTitle from './FooterColumnTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 155,
  },
}));

const FooterColumn = ({ title, links }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FooterColumnTitle>{title}</FooterColumnTitle>
      {links.map((link, index) => (
        <FooterColumnLink
          key={index}
          name={link.name}
          Icon={link.icon}
          IconHover={link.iconHover}
          link={link.link}
        />
      ))}
    </div>
  );
};

export default FooterColumn;
