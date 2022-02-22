import React from 'react';

const BenefitIcon1 = (props) => {
  return (
    <svg width="90" height="90" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle fill="#288C92" cx="44" cy="44" r="36" />
        <path
          d="M44 88c-9 0-18-9-25-13C7 67 0 59 0 44c0-13 4-18 14-26 7-7 19-18 30-18 18 0 29 10 36 28 2 6 8 17 8 23 0 24-20 37-44 37z"
          stroke="#54606A"
          strokeWidth="1.5"
        />
        <text fontFamily="Roboto" fontSize="18" fontWeight="700" letterSpacing=".3" fill="#FFF">
          <tspan x="38.6" y="45">
            1
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default BenefitIcon1;
