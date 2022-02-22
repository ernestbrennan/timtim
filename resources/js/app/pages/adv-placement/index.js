import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ContactUs from './ContactUs';
import Table from './table/Table';
import Footer from '$app/components/common/footer/Footer';

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    overflowY: 'scroll',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  container: {
    width: '100%',
    paddingTop: '50px',
    paddingBottom: '50px',
    margin: '0 auto',
    '@media (min-width: 768px)': {
      maxWidth: '736px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1120px',
    },
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 0,
    padding: '0 32px',
    lineHeight: 1.4,

    '@media (min-width: 768px)': {
      padding: '0 45px',
    },
  },
  subtitle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    marginTop: 42,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: -0.4,
    '@media (min-width: 768px)': {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 15,
    },
  },
}));

const TITLE = 'Пакетна пропозиція щодо розміщення на платформі TimTim';
const SUBTITLE1 = 'Термін дії пакета — 30 днів. Всі ціни вказані з урахування ПДВ.';
const SUBTITLE2 = 'Вартість паркетних пропозицій сплачується авансом.';

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>{TITLE}</h1>
        <Table />
        <p className={classes.subtitle}>
          {SUBTITLE1}
          <br />
          {SUBTITLE2}
        </p>
        <div>
          <ContactUs />
        </div>
        <Footer altView />
      </div>
    </div>
  );
};