import { useParams } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Trans } from '@lingui/macro';

import Text, { TextColors, TextWeight } from '$app/components/common/Text';
import StyledLink from '$app/components/common/StyledLink';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import Routes from '$app/utlis/routes';
import notFound from '@app/img/notFound.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '1408px',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 'unset',
      flexDirection: 'column',
      justifyContent: 'unset',
      textAlign: 'center',
    },
  },
  column: {
    maxWidth: '400px',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: 'unset',
    },
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '40px 0',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  buttons: {
    background: '#F3F3F3',
    borderRadius: '24px',
    marginRight: '16px',
    padding: '4px 14px',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: '400',
    '&:hover': {
      backgroundColor: '#E8E8E8',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0',
    },
  },
}));

function useGetNavigationButtons() {
  const { language, cityName } = useParams();
  const rentRoute = useGetFullRoute(Routes.rent);
  const saleRoute = useGetFullRoute(Routes.sale);
  const complexesRoute = useGetFullRoute(Routes.complexList);

  if (!language || !cityName) {
    const defaultMetaPath = '/ru/tashkent';
    return [
      {
        text: <Trans>Rent</Trans>,
        link: defaultMetaPath + Routes.rent,
      },
      {
        text: <Trans>Sale</Trans>,
        link: defaultMetaPath + Routes.sale,
      },
      {
        text: <Trans>New buildings</Trans>,
        link: defaultMetaPath + Routes.complexList,
      },
    ];
  }

  return [
    {
      text: <Trans>Rent</Trans>,
      link: rentRoute,
    },
    {
      text: <Trans>Sale</Trans>,
      link: saleRoute,
    },
    {
      text: <Trans>New buildings</Trans>,
      link: complexesRoute,
    },
  ];
}

const NotFoundPage = () => {
  const classes = useStyles();
  const navigationButtons = useGetNavigationButtons();

  return (
    <Box className={classes.root}>
      <Box className={classes.column} mr={5}>
        <Text size={80} weight={TextWeight.bold}>
          Ooops!
        </Text>
        <Text size={36} weight={TextWeight.semiLight} style={{ marginBottom: '20px' }}>
          <Trans>Page not found</Trans>
        </Text>
        <Text size={16} weight={TextWeight.light}>
          <Trans>The page may have moved or never existed. Go to</Trans>
          <Text color={TextColors.link} display={'inline'} style={{ cursor: 'pointer' }}>
            <StyledLink to={useGetFullRoute(Routes.index)}>
              <Trans>home page</Trans>
            </StyledLink>
          </Text>
        </Text>
        <Box className={classes.buttonsWrapper}>
          {navigationButtons.map((item) => (
            <Button key={uuidv4()} className={classes.buttons}>
              <StyledLink to={item.link}>{item.text}</StyledLink>
            </Button>
          ))}
        </Box>
      </Box>
      <Box className={classes.column}>
        <img src={notFound} alt=""/>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
