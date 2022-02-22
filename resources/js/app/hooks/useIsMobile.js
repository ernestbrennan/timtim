import { useMediaQuery, useTheme } from '@material-ui/core';

const breakpoint = 'sm';

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
}

export default useIsMobile;
