import React from 'react';

function OwnerIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" {...props}>
      <mask id="a" width="7" height="15" x="11" y="5" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M11.45 5.29h6.35v14.7h-6.35V5.3z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#a)">
        <path
          fill="#1F2229"
          fillRule="evenodd"
          d="M11.95 20a.5.5 0 01-.3-.9 17.96 17.96 0 003.6-3.2 7.64 7.64 0 001.52-4.27c.07-1.43 0-5.8 0-5.84 0-.27.22-.5.5-.5.24 0 .5.21.5.49 0 .18.07 4.43 0 5.9a8.74 8.74 0 01-1.72 4.8c-.67.92-1.95 2.07-3.8 3.42a.5.5 0 01-.3.1z"
          clipRule="evenodd"
        ></path>
      </g>
      <path
        fill="#00A4BD"
        fillRule="evenodd"
        d="M15.48 5.04a17.76 17.76 0 00-11.96 0 .78.78 0 00-.52.73v4.88a7.56 7.56 0 003.25 6.13l3 2.14c.15.1.36.1.5 0l3-2.14A7.56 7.56 0 0016 10.65V5.77c0-.33-.2-.62-.52-.73z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1F2229"
        fillRule="evenodd"
        d="M3.48 4a.48.48 0 01-.17-.94c3.34-1.24 6.9-1.4 10.34-.44.25.07.4.34.33.6a.48.48 0 01-.6.33c-3.22-.9-6.59-.76-9.72.42a.48.48 0 01-.18.03z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FFE55B"
        fillRule="evenodd"
        d="M9.06 13c-.25 0-.5-.09-.72-.27l-2.12-2.32a.88.88 0 01-.02-1.14.67.67 0 011.02-.01l1.85 2.02 3.7-4.05a.67.67 0 011.03.01c.27.33.27.84-.02 1.15L9.9 12.62c-.23.25-.53.38-.84.38z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default OwnerIcon;
