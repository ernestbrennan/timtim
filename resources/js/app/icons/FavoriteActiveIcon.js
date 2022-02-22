import React from 'react';

function FavoriteActiveIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" {...props}>
      <rect width="31" height="31" x="0.5" y="0.5" stroke="#02A3BB" rx="15.5" />
      <path
        fill="#02A3BB"
        d="M16 23.23l-.97-.88c-3.43-3.11-5.7-5.16-5.7-7.68A3.63 3.63 0 0113 11a4 4 0 013 1.4 4 4 0 013-1.4 3.63 3.63 0 013.67 3.67c0 2.52-2.27 4.57-5.7 7.69l-.97.87z"
      />
    </svg>
  );
}

export default FavoriteActiveIcon;
