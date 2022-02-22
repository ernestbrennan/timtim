import React from 'react';
import { googlePlayRentalsURL } from '$js/config';

const GooglePlayRentalsLink = ({ className, children, ...props }) => {
  return (
    <a
      className={className}
      href={googlePlayRentalsURL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
    >
      {children}
    </a>
  );
};

export default GooglePlayRentalsLink;
