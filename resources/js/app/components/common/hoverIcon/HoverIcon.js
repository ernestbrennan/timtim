import React from 'react';
import useHover from '$app/hooks/useHover';

const HoverIcon = ({ Icon, HoverIcon, selected = false, ...rest }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div {...rest} ref={hoverRef} style={{ cursor: 'pointer' }}>
      {isHovered || selected ? <HoverIcon /> : <Icon />}
    </div>
  );
};

export default HoverIcon;
