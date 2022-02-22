import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Row from './Row';

const AcceptSVG = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="#02A3BB"
      />
      <path
        d="M26.2083 15.0256C26.7744 14.4592 27.6925 14.4589 28.2589 15.0251C28.8253 15.5912 28.8255 16.5093 28.2594 17.0757L18.3705 26.9693C18.3129 27.0269 18.2194 27.0266 18.1622 26.9687L14.0195 22.7791C13.4565 22.2097 13.4616 21.2916 14.0311 20.7285C14.6005 20.1655 15.5186 20.1706 16.0816 20.7401L18.2771 22.9605L26.2083 15.0256Z"
        fill="white"
      />
    </svg>
  );
};

const useStyles = makeStyles(() => ({
  table: {
    borderBottom: '2px solid #1F2229',

    '@media (min-width: 768px)': {
      borderRadius: 24,
      border: '2px solid #1F2229',
      overflow: 'hidden',
    },
  },

  headInner: {
    display: 'none',

    '@media (min-width: 768px)': {
      paddingLeft: 273,
      display: 'flex',
      height: 80,
    },

    '@media (min-width: 1200px)': {
      paddingLeft: 538,
    },
  },

  head: {
    height: 17,
    width: '100%',
    backgroundColor: '#FBC833',

    '@media (min-width: 768px)': {
      height: 'auto',
    },
  },

  cell: {
    width: 0,
    flexGrow: 1,
    borderRight: '2px solid #1F2229',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    display: 'flex',

    '&:last-child': {
      borderRight: 'none',
    },

    '&:first-child': {
      borderLeft: '2px solid #1F2229',
    },
  },

  addons: {
    padding: 20,
    backgroundColor: '#FBC833',
    fontWeight: 600,
  },
}));

const Table = () => {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      <div className={classes.head}>
        <div className={classes.headInner}>
          <div className={classes.cell}>Київ</div>
          <div className={classes.cell}>Київська область</div>
          <div className={classes.cell}>Одеса, Львів, Харків</div>
          <div className={classes.cell}>Інші міста</div>
        </div>
      </div>
      <Row
        caption={
          <>
            Розміщення на платформі TimTim картки проєкту <br /> (доступ до статистики відвідувань у
            кабінеті девелопера)
          </>
        }
        items={[<AcceptSVG />, <AcceptSVG />, <AcceptSVG />, <AcceptSVG />]}
      />
      <Row
        caption="Актуалізація цін, планувань, інформації про компанію, термінів будівництва і введення в експлуатацію (раз на 2 тижні)"
        items={[<AcceptSVG />, <AcceptSVG />, <AcceptSVG />, <AcceptSVG />]}
      />
      <Row
        caption="Публікація статті  в онлайн-журналі про компанію чи проєкт/згадування про компанію в редакційних оглядах або публікація думки експерта, який представляє компанію"
        items={['1/1', '1/1', '1/1', '1/1']}
      />
      <Row
        caption={
          <>
            Охоплення аудиторії в межах платформи TimTim: <br /> показів
          </>
        }
        items={['20 000', '15 000', '10 000', '5 000']}
      />
      <Row
        caption="Перехід до картки проєкту на платформі  TimTim"
        items={['2 000', '1 500', '750', '500']}
      />
      <Row
        caption="Перехід на сайт компанії або проєкту з платформи TimTim"
        items={['700', '500', '300', '250']}
      />
      <Row
        caption="Ліди (заповнені в будь-який спосіб лід-форми або дзвінки)"
        items={['7', '5', '3', '2']}
      />
      <Row
        caption={
          <>
            Перевірені ліди (заповнені в будь-який спосіб лід-форми або дзвінки, перевірені в нашому
            кол-центрі запити)
            <br />
            <b>+ 3 600 грн. до вартості пакета для розміщення</b>
          </>
        }
        items={['7', '5', '3', '2']}
      />
      <Row
        caption={<b>Вартість пакетної пропозиції</b>}
        items={[<b>18 000 грн.</b>, <b>15 000 грн.</b>, <b>12 600 грн.</b>, <b>10 200 грн.</b>]}
      />
      <div className={classes.addons}>Додаткові можливості разом із TimTim</div>
      <Row
        caption="Вартість лідів (заповнені в будь-який спосіб лід-форми або дзвінки)"
        items={[
          <b>+ 500 грн. / 1 лід</b>,
          <b>+ 350 грн. / 1 лід</b>,
          <b>+ 350 грн. / 1 лід</b>,
          <b>+ 300 грн. / 1 лід</b>,
        ]}
      />
      <Row
        caption="Вартість перевірених лідів (заповнені в будь-який спосіб лід-форми або дзвінки,  перевірені в нашому кол-центрі запити)"
        items={[
          <b>+ 600 грн. / 1 лід</b>,
          <b>+ 400 грн. / 1 лід</b>,
          <b>+ 400 грн. / 1 лід</b>,
          <b>+ 350 грн. / 1 лід</b>,
        ]}
      />
    </div>
  );
};

export default Table;
