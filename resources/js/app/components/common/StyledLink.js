import { Link } from 'react-router-dom';
import React from 'react';

function StyledLink({ children, to, style, ...props }) {
  return (
    <Link
      to={to}
      href={to}
      {...props}
      style={{
        ...{ textDecoration: 'none', color: 'inherit' },
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
