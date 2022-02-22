import {useMediaQuery, useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Text from "$app/components/common/Text";
import React from "react";

export default ({text, isOpen, ...props}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Button
      style={{
        width: '100%',
        height: '100%',
        textTransform: 'none',
        padding: isMobile ? undefined : '0 24px',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: 10
      }}
      {...props}
    >
      <Box style={{
        overflow: 'hidden',
        alignItems: 'center',
        color: theme.palette.primary.main,
        justifyContent: 'space-between',
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
      }}
      >
        <Text
          size={12}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxHeight: '28px',
            maxWidth: isMobile ? '312px' : '470px',
            whiteSpace: 'nowrap',
            color: theme.palette.primary.main
          }}
        >
          {text}
        </Text>
        <Box>{isOpen ? '\u25B4' : '\u25BE'}</Box>
      </Box>
    </Button>
  );
}
