import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const FooterLink = (props) => {
  return /(^https?:\/\/|mailto:)/.test(props.to) || props.to.includes(process.env.APP_HOST_SITE) ? (
    // eslint-disable-next-line
    <a href={props.to} {...props} target={'_blank'} rel="noopener noreferrer" />
  ) : (
    <RouterLink {...props} />
  );
};

export default FooterLink;
