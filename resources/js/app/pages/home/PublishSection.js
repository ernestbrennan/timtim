import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { Trans } from '@lingui/macro';

import useIsMobile from '$app/hooks/useIsMobile';
import useGetHostRoute from '$app/hooks/useGetHostRoute';
import Text, { TextColors, TextWeight } from '$app/components/common/Text';
import StyledButton from '$app/components/common/StyledButton';
import HomePlusIcon from '$app/icons/HomePlus';
import toasterDrawing from '@app/img/toaster.png';

const useStyles = makeStyles((theme) => ({
  publish: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#65AFAF',
    borderRadius: '8px',
    padding: '40px 0',
    minHeight: `167px`,
    [theme.breakpoints.down('md')]: {
      minHeight: `400px`,
      padding: '32px 0',
      flexDirection: 'column',
      textAlign: 'center',
      borderRadius: 'unset',
    },
  },
  padding: {
    width: '100%',
    maxWidth: '1408px',
    paddingLeft: '16px',
    paddingRight: '16px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '144px',
      paddingRight: '144px',
    },
  },
  img: {
    height: 87,
  },
  button: {
    height: '48px',
    backgroundColor: '#FFE36F',
    '&:hover': {
      backgroundColor: '#FFE36F',
    },
  },
  label: {
    marginBottom: -2,
  },
}));

function PublishSection() {
  const styles = useStyles();
  const isMobile = useIsMobile();
  const lendAnApartmentUrl = useGetHostRoute('edit/new/');

  return (
    <Box id="publish" className={classNames(styles.publish, styles.padding)}>
      <Box ml={isMobile ? 0 : 4}>
        <img src={toasterDrawing} alt="" className={styles.img} />
      </Box>
      <Box display={'flex'} flexDirection={'column'}>
        <Text size={24} weight={TextWeight.heavy} color={TextColors.contrast}>
          <Trans>
            Placing an ad{' '}
            <Hidden smUp>
              <br />
            </Hidden>
            in TimTim - easy
          </Trans>
        </Text>
        <Hidden mdUp>
          <Box p={1} />
        </Hidden>
      </Box>
      <Box mr={isMobile ? 0 : 4}>
        <StyledButton
          className={styles.button}
          startIcon={<HomePlusIcon></HomePlusIcon>}
          onClick={() => {
            window.open(lendAnApartmentUrl, "_blank")
          }}
        >
          <Box alignItems={'center'} display={'flex'}>
            <Text className={styles.label}>
              <Trans>Publish an ad</Trans>
            </Text>
          </Box>
        </StyledButton>
      </Box>
    </Box>
  );
}

export default PublishSection;
