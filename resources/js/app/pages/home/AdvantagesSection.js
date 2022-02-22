import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import Text, { TextColors, TextWeight } from '$app/components/common/Text';
import useIsMobile from '$app/hooks/useIsMobile';
import phoneWithPaw from '@app/img/mobileWithPaw.png';
import paper from '@app/img/paper.png';
import bearWithKey from '@app/img/bearWithKey.png';

import checkedImg from '@app/img/home/checked.png';
import medalImg from '@app/img/home/medal.png';
import menuImg from '@app/img/home/menu.png';


function AdvantageBlock({ imgSrc, title, description, imgHeight }) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      maxWidth={'306px'}
      style={{ textAlign: 'center' }}
    >
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={'170px'}>
        <img src={imgSrc} style={{ height: imgHeight }} alt={''} />
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={1}>
        <Text size={20} weight={TextWeight.heavy}>
          {title}
        </Text>
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Text size={16} color={TextColors.secondary} weight={TextWeight.semiLight}>
          {description}
        </Text>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  advantages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 0',
    [theme.breakpoints.down('xs')]: {
      padding: '32px 0',
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
  title: {
    textAlign: 'center',
  },
}));

const AdvantagesSection = () => {
  const styles = useStyles();
  const isMobile = useIsMobile();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box id={'advantages'} className={classNames(styles.advantages, styles.padding)}>
      <Text
        size={40}
        weight={TextWeight.heavy}
        mb={isMobile ? 'unset' : '50px'}
        className={styles.title}
      >
        <Trans>Our advantages</Trans>
      </Text>
      <Grid
        container
        direction={isPhone ? 'column' : 'row'}
        justify={isPhone ? 'center' : 'space-around'}
        alignItems={'center'}
        spacing={isMobile ? 0 : 10}
      >
        <Grid item md={4}>
          <AdvantageBlock
            imgSrc={medalImg}
            imgHeight={'101px'}
            title={
              <Trans>
                All ads <br /> in one place{' '}
              </Trans>
            }
            description={
              <Trans>
                TimTim collects ads from real estate sites, checks their relevance and removes
                duplicates
              </Trans>
            }
          >
          </AdvantageBlock>
        </Grid>
        <Grid item md={4}>
          <AdvantageBlock
            imgSrc={checkedImg}
            imgHeight={'91px'}
            title={
              <Trans>
                Verified <br /> publishers
              </Trans>
            }
            description={
              <Trans>In TimTim, ads can be published directly through the mobile app</Trans>
            }
          >
          </AdvantageBlock>
        </Grid>
        <Grid item md={4}>
          <AdvantageBlock
            imgSrc={menuImg}
            imgHeight={'130px'}
            title={
              <Trans>
                Keeping order <br /> and honest ads
              </Trans>
            }
            description={
              <Trans>
                You tell us about false ads, together we create an honest real estate base
              </Trans>
            }
          >
          </AdvantageBlock>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvantagesSection;
