import { NavLink } from 'react-router-dom';
import React from 'react';

function StyledNavLink({ children, to, style, ...props }) {
  return (
    <NavLink
      to={to}
      href={to}
      {...props}
      style={{
        //...{textDecoration: 'none', color: 'inherit'},
        ...style,
      }}
    >
      {children}
    </NavLink>
  );
}

export default StyledNavLink;
