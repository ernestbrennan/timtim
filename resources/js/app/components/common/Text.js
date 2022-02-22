import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

export const TextTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

const TextTypesValues = {
  primary: 'Montserrat',
  secondary: 'sans-serif',
};

export const TextWeight = {
  light: 'light',
  semiLight: 'semiLight',
  normal: 'normal',
  heavy: 'heavy',
  bold: 'bold',
};

const TextWeightValues = {
  light: 300,
  semiLight: 400,
  normal: 500,
  heavy: 700,
  bold: 900,
};

export const TextColors = {
  primary: 'primary',
  secondary: 'secondary',
  contrast: 'contrast',
  link: 'link',
};

const TextColorsValues = {
  primary: '#1F2229',
  secondary: '#54606A',
  contrast: '#FFFFFF',
  link: '#0092A8',
};

function getTextStyles({ type, size, weight, color }) {
  return {
    fontFamily: TextTypesValues[type],
    fontSize: `${size}px`,
    fontWeight: TextWeightValues[weight],
    color: TextColorsValues[color],
    textOverflow: 'ellipsis',
  };
}

function Text({
  type = TextTypes.primary,
  size = 14,
  weight = TextWeight.normal,
  color = TextColors.primary,
  children,
  ...props
}) {
  return (
    <Box {...props} {...getTextStyles({ type, size, weight, color })}>
      {children}
    </Box>
  );
}

Text.propTypes = {
  type: PropTypes.oneOf(Object.values(TextTypes)),
  weight: PropTypes.oneOf(Object.values(TextWeight)),
  color: PropTypes.oneOf(Object.values(TextColors)),
  size: PropTypes.number,
};

export default Text;
