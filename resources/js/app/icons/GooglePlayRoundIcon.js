import React from 'react';

function GooglePlayRoundIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
      <rect width="40" height="40" fill="#F4F4F4" rx="20"></rect>
      <path
        fill="#00C9FF"
        fillRule="evenodd"
        d="M15.02 11.74l8.62 8.62-8.62 8.62-.02-.26V12l.02-.26z"
        clipRule="evenodd"
      ></path>
      <mask id="a" width="12" height="9" x="15" y="21" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M15.74 21.04h10.77v8.66H15.74v-8.66z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#a)">
        <path
          fill="#FF3A44"
          fillRule="evenodd"
          d="M24.37 21.04l2.14 2.12-.98.62a47064.92 47064.92 0 01-9.1 5.77c-.23.15-.5.19-.69.12l8.63-8.63z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#00F076"
        fillRule="evenodd"
        d="M15.73 11.03a.84.84 0 01.69.11l2.84 1.8 7.15 4.54.1.07-2.15 2.11-8.63-8.63z"
        clipRule="evenodd"
      ></path>
      <mask id="b" width="7" height="5" x="24" y="18" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M25 18.07h5.1v4.56H25v-4.56z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#b)">
        <path
          fill="#FFD100"
          fillRule="evenodd"
          d="M25 20.32l1.07-1.04 1.15-1.16c.05-.05.09-.07.16-.02l2.25 1.45a.94.94 0 010 1.61l-.6.4-1.64 1.04c-.07.05-.1.05-.17-.01l-2.16-2.2-.06-.07z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export default GooglePlayRoundIcon;
