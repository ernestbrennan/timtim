import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Section from './Section';
import img1 from '@app/img/advPlacement/contacts.png';
import img1x2 from '@app/img/advPlacement/contactsX2.png';
import img2 from '@app/img/advPlacement/paper.png';
import img2x2 from '@app/img/advPlacement/paperX2.png';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    '@media (min-width: 768px)': {
      marginLeft: 0,
      marginRight: 0,
    },
    '@media (min-width: 1200px)': {
      flexDirection: 'row',
    },
  },
  link: {
    color: '#1F2229',
    fontSize: 14,
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  mobileLink: {
    display: 'block',
    lineHeight: '0px',
    marginBottom: 10,

    '@media (min-width: 768px)': {
      display: 'inline',
    },
  },
}));

const Picture1 = () => (
  <picture>
    <source srcSet={`${img1x2} 2x`} media="(min-resolution: 120dpi)" />
    <img src={img1} alt="Contact us" />
  </picture>
);

const Picture2 = () => (
  <picture>
    <source srcSet={`${img2x2} 2x`} media="(min-resolution: 120dpi)" />
    <img src={img2} alt="Contact us" />
  </picture>
);

const ContactUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Section
        img={<Picture1 />}
        title="Контакти"
        subtitle={
          <>
            <span className={classes.mobileLink}>
              <a href="#" className={classes.link}>
                info@mail.com
              </a>
              {`, `}
            </span>
            <a href="tel: +38(044) 344 89 23" className={classes.link}>
              (044) 344 89 23
            </a>
            {`, `}
            <a href="tel: +38(099) 033 92 99" className={classes.link}>
              (099) 033 92 99
            </a>
          </>
        }
      />
      <Section
        img={<Picture2 />}
        title="Редакція журналу:"
        subtitle={
          <a href="mailto:editor@mail.com" className={classes.link}>
            editor@mail.com
          </a>
        }
      />
    </div>
  );
};

export default ContactUs;
