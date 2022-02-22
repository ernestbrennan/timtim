import React from 'react';

const ResponsiveImage = ({ image1x, image2x, alt = '', ...rest }) => {
  return <img srcSet={`${image2x} 2x, ${image1x} 1x`} src={image1x} alt={alt} {...rest}></img>;
};

export default ResponsiveImage;
