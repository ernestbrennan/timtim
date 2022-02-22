import React from 'react';
import { appStoreRentalsURL } from '$js/config';

const AppStoreRentalsLink = ({ className, children, ...props }) => {
  return (
    <a
      className={className}
      href={appStoreRentalsURL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
    >
      {children}
    </a>
  );
};

export default AppStoreRentalsLink;
