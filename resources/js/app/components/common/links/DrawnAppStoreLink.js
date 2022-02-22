import React from 'react';

import { appStoreRentalsURL } from '$js/config';
import drawnAppStoreLabel from '@app/img/drawnAppStoreLabel.png';

function DrawnAppStoreLink(props) {
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
        src={drawnAppStoreLabel}
        alt={'hand drawn app store label'}
        onClick={() => {
          window.open(appStoreRentalsURL, '_blank');
        }}
        style={{ cursor: 'pointer', height: '55px' }}
        {...props}
      />
    </div>
  );
}

export default DrawnAppStoreLink;
