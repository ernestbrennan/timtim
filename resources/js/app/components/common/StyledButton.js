import React from "react";
import { Button } from '@material-ui/core';

export default ({ children, ...props }) => {

  return (
    <Button
      className={props.className}
      onClick={props.onClick}
      startIcon={props.startIcon}
      style={{
        ...{
          background: (props) => (props.altColor ? '#02A3BB' : '#F9C834'),
          borderRadius: '24px',
          color: (props) => (props.altColor ? '#fff' : '#1F2229'),
          padding: '8px 32px',
          textTransform: 'none',
          width: (props) => (props.fullWidth ? '100%' : undefined),
        },
      }}
    >
      {children}
    </Button>
  )
}