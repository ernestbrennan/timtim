import React from 'react';

import { googlePlayRentalsURL } from '$js/config';
import drawnGooglePlayLabel from '@app/img/drawnGooglePlayLabel.png';

function DrawnGooglePlayLink(props) {
  return (
    <div
      style={{
        background: '#fff',
        height: '50px',
        marginBottom: '5px',
        borderRadius: '8px',
      }}
    >
      <img
        src={drawnGooglePlayLabel}
        alt={'hand drawn google play banner'}
        onClick={() => {
          window.open(googlePlayRentalsURL, '_blank');
        }}
        style={{ cursor: 'pointer', height: '55px' }}
        {...props}
      />
    </div>
  );
}

export default DrawnGooglePlayLink;
