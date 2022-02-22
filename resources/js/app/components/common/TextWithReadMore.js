import React, { useState } from 'react';
import {Collapse, makeStyles} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { Trans } from '@lingui/macro';
import sanitizeHtml from 'sanitize-html'

import StyledButton from './StyledButton'

const useTitleStyle = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.5,
    color: '#000',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  fadeout: {
  bottom: 0,
  height: 90,
  background: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
  position: 'absolute',
  width: '100%'
}

}));

function TextWithReadMore({ text = ''}) {
  const classes = useTitleStyle();
  const cleanText = sanitizeHtml(text)
  const [showMoreButton, setShowMoreButton] = useState(true);
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      <Box position={'relative'}>
        <Collapse in={!showMoreButton} collapsedHeight={120}>
          <div dangerouslySetInnerHTML={{__html: cleanText}} />
        </Collapse>
        {showMoreButton && <Box className={classes.fadeout}></Box>}
      </Box>
      <Box display={'flex'} alignItems={'center'} mt={1}>
        <Box height={'1px'} style={{ backgroundColor: 'rgba(31,34,41, 0.1)' }} flex={1} />
        <Box p={1} />
        <StyledButton onClick={() => {setShowMoreButton((prev) => !prev)}}>
          {showMoreButton ? <><Trans>more</Trans> {'\u25be'}</> : <><Trans>less</Trans> {'\u25b4'}</>}
        </StyledButton>
        <Box p={1} />
        <Box height={'1px'} style={{ backgroundColor: 'rgba(31,34,41, 0.1)' }} flex={1} />
      </Box>
    </div>
  );
}

export default TextWithReadMore;
